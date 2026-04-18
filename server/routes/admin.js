const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

const ADMIN_EMAIL = 'global5665@gmail.com';

// Admin-only middleware — strictly the single ADMIN_EMAIL account.
// Role is intentionally NOT accepted here: only one owner email has admin access.
async function adminOnly(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.adminUser = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ============================================
// STATS — overview numbers + breakdowns
// ============================================
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const d7  = new Date(today); d7.setDate(d7.getDate() - 6);      // last 7 days incl today
    const d30 = new Date(today); d30.setDate(d30.getDate() - 29);   // last 30 days incl today

    const [total, todayCount, last7, last30, admins, verified, allUsers] = await Promise.all([
      User.countDocuments({ isDeleted: { $ne: true } }),
      User.countDocuments({ createdAt: { $gte: today }, isDeleted: { $ne: true } }),
      User.countDocuments({ createdAt: { $gte: d7 }, isDeleted: { $ne: true } }),
      User.countDocuments({ createdAt: { $gte: d30 }, isDeleted: { $ne: true } }),
      User.countDocuments({ role: 'admin', isDeleted: { $ne: true } }),
      User.countDocuments({ emailVerified: true, isDeleted: { $ne: true } }),
      User.find({ isDeleted: { $ne: true } }).select('country createdAt memories friends loginCount'),
    ]);

    // Country breakdown
    const countryCounts = {};
    let totalMemories = 0;
    let totalFriendships = 0;
    let activeUsers = 0; // users with 2+ logins
    allUsers.forEach(u => {
      const c = u.country || 'Unknown';
      countryCounts[c] = (countryCounts[c] || 0) + 1;
      totalMemories += (u.memories?.length || 0);
      totalFriendships += (u.friends?.length || 0);
      if ((u.loginCount || 0) >= 2) activeUsers++;
    });
    const byCountry = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);

    // 30-day signup trend (daily)
    const trend = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const dNext = new Date(d); dNext.setDate(d.getDate() + 1);
      const count = allUsers.filter(u => u.createdAt >= d && u.createdAt < dNext).length;
      trend.push({ date: d.toISOString().split('T')[0], count });
    }

    res.json({
      total,
      today: todayCount,
      last7,
      last30,
      admins,
      verified,
      activeUsers,
      totalMemories,
      totalFriendships: totalFriendships / 2, // each friendship counted twice
      byCountry,
      trend,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// USERS LIST — paginated, searchable
// ============================================
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const search = (req.query.search || '').trim();
    const country = (req.query.country || '').trim();
    const sort = req.query.sort || '-createdAt';

    const filter = { isDeleted: { $ne: true } };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (country) filter.country = country;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('name email country phoneCode mobile role createdAt lastLogin loginCount avatar emailVerified')
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    // Attach counts for each user (without loading full arrays)
    const ids = users.map(u => u._id);
    const fullUsers = await User.find({ _id: { $in: ids } })
      .select('memories friends tripPlans selectedLocations visitedCountries')
      .lean();
    const counts = Object.fromEntries(
      fullUsers.map(u => [u._id.toString(), {
        memories:   u.memories?.length || 0,
        friends:    u.friends?.length || 0,
        trips:      u.tripPlans?.length || 0,
        regions:    u.selectedLocations?.filter(l => !l.type || l.type !== 'country').length || 0,
        countries:  u.selectedLocations?.filter(l => l.type === 'country').length || 0,
      }])
    );
    users.forEach(u => { u.counts = counts[u._id.toString()] || {}; });

    res.json({ users, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// USER DETAIL — full read-only record
// ============================================
router.get('/users/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('friends', 'name email country avatar')
      .select('-resetOtp -resetOtpExpires -resetOtpAttempts -resetToken -resetTokenExpires -emailVerifyToken -emailVerifyTokenExpiry -password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
