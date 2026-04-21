const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const email = require('../services/email');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ADMIN_EMAIL = 'global5665@gmail.com';

// Demo memory seeded on every new signup so the user sees a fully populated
// "Memory Wall" example immediately after creating their account.
const DEMO_MEMORY = {
  title: 'My Days at Arizona',
  country: 'USA',
  region: 'Arizona',
  story: 'The Grand Canyon at sunrise took my breath away — thousand-colored cliffs for as far as the eye could see. Then the desert stars at night, the red-rock hikes around Sedona, a dusk drive along Route 66. Arizona delivered everything I hoped for and a few surprises I didn\'t see coming. This is just the start — a placeholder memory to show what your Memory Wall can look like. Replace it with your own!',
  photos: [
    '/felix-rostig-UmV2wr-Vbq8-unsplash.jpg',
    '/tom-barrett-M0AWNxnLaMw-unsplash.jpg',
    '/spencer-davis-0QcSnCM0aMc-unsplash.jpg',
    '/diego-jimenez-A-NVHPka9Rk-unsplash.jpg',
  ],
  dateVisited: new Date('2025-10-15'),
  visibility: 'public',
  isDemo: true,
};

const OTP_TTL_MS = 10 * 60 * 1000;            // 10 minutes
const OTP_MAX_ATTEMPTS = 5;
const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;    // 15 minutes after OTP verified

function genOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, mobile, email: emailAddr, password, country, phoneCode, invitedBy } = req.body;

    if (!name || !emailAddr || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: emailAddr.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: emailAddr.toLowerCase().trim(),
      password: hashedPassword,
      mobile: mobile || '',
      phoneCode: phoneCode || '+1',
      country: country || 'USA',
      role: emailAddr.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'user',
      selectedLocations: [],
      visitedRegions: [],
      visitedCountries: [],
      visitedDestinations: [],
      userDestinations: [],
      tripPlans: [],
      memories: [{ ...DEMO_MEMORY }],
      milestones: [],
    });

    await user.save();

    // Fire-and-forget welcome email
    email.sendWelcomeEmail(user).catch(err => console.error('welcome email failed:', err.message));

    // If invitedBy email provided, auto-create friend request from inviter
    if (invitedBy) {
      try {
        const inviter = await User.findOne({ email: String(invitedBy).toLowerCase() });
        if (inviter && inviter._id.toString() !== user._id.toString()) {
          inviter.friends.push(user._id);
          user.friends.push(inviter._id);
          await Promise.all([inviter.save(), user.save()]);
        }
      } catch {}
    }

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email: emailAddr, password } = req.body;
    if (!emailAddr || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: emailAddr.toLowerCase() }).select('+password');
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (user.isDeleted) return res.status(403).json({ error: 'Account has been deleted' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;

    // Keep the isDemo memory's photo set in sync with the current seed so legacy
    // Unsplash URLs (and the earlier single-photo seed) upgrade on next login.
    // Skip if the user has added their own photos (data: URLs) — we don't want to clobber uploads.
    const demoMem = (user.memories || []).find(m => m.isDemo);
    if (demoMem) {
      const photos = demoMem.photos || [];
      const hasUserUpload = photos.some(p => typeof p === 'string' && p.startsWith('data:'));
      const matchesSeed =
        photos.length === DEMO_MEMORY.photos.length &&
        photos.every((p, i) => p === DEMO_MEMORY.photos[i]);
      if (!hasUserUpload && !matchesSeed) {
        demoMem.photos = [...DEMO_MEMORY.photos];
        user.markModified('memories');
      }
    }

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        phoneCode: user.phoneCode,
        country: user.country,
        bio: user.bio,
        avatar: user.avatar,
        theme: user.theme,
        units: user.units,
        language: user.language,
        role: user.role,
        emailVerified: user.emailVerified,
        selectedLocations: user.selectedLocations,
        visitedCountries: user.visitedCountries,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.isDeleted) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ============================================
// FORGOT PASSWORD — OTP FLOW
// ============================================

// Step 1: request OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email: emailAddr } = req.body;
    if (!emailAddr) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email: emailAddr.toLowerCase() });
    if (!user || user.isDeleted) {
      return res.status(404).json({
        error: 'email_not_registered',
        message: "This email isn't registered with StampYourMap. Create a new account to get started.",
      });
    }

    const otp = genOtp();
    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + OTP_TTL_MS);
    user.resetOtpAttempts = 0;
    await user.save();

    email.sendOtpEmail(user, otp).catch(err => console.error('otp email failed:', err.message));
    res.json({ message: "We've sent a 6-digit code to your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Step 2: verify OTP → issue reset token
router.post('/verify-otp', async (req, res) => {
  try {
    const { email: emailAddr, otp } = req.body;
    if (!emailAddr || !otp) return res.status(400).json({ error: 'Email and code required' });

    const user = await User.findOne({ email: emailAddr.toLowerCase() })
      .select('+resetOtp +resetOtpExpires +resetOtpAttempts');
    if (!user) return res.status(400).json({ error: 'Invalid code' });

    if (!user.resetOtp || !user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ error: 'Code expired. Request a new one.' });
    }
    if (user.resetOtpAttempts >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({ error: 'Too many attempts. Request a new code.' });
    }
    if (user.resetOtp !== String(otp).trim()) {
      user.resetOtpAttempts = (user.resetOtpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ error: 'Invalid code' });
    }

    const resetToken = crypto.randomBytes(24).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    user.resetOtpAttempts = 0;
    await user.save();

    res.json({ resetToken, message: 'Code verified. Use the token to reset your password.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Step 3: reset password with verified token
router.post('/reset-password', async (req, res) => {
  try {
    const { email: emailAddr, resetToken, newPassword } = req.body;
    if (!emailAddr || !resetToken || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email: emailAddr.toLowerCase() })
      .select('+resetToken +resetTokenExpires +password');
    if (!user || !user.resetToken || user.resetToken !== resetToken) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ error: 'Reset token expired. Start over.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset. You can log in with your new password.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// EMAIL DIAGNOSTICS — gated by a shared secret
// GET /api/auth/email-debug?key=<EMAIL_DEBUG_KEY>&to=<optional@addr>
// Returns the raw SMTP verify + test-send result so you can see
// exactly why an email didn't go out (bad password, port blocked,
// etc). Set EMAIL_DEBUG_KEY in Render env to any random string.
// ============================================
router.get('/email-debug', async (req, res) => {
  const required = process.env.EMAIL_DEBUG_KEY;
  if (!required) return res.status(404).json({ error: 'not available' });
  if (req.query.key !== required) return res.status(403).json({ error: 'bad key' });
  const result = await email.diagnose(req.query.to);
  res.json(result);
});

module.exports = router;
