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

// ============================================
// PHOTOS — flat gallery across every user's memories
//
// Memories are embedded on the User doc and each memory has
// `photos: [String]` of base64 data-URLs. For the operator
// console we flatten all of them into one paginated list so
// an admin can audit uploads in one place.
//
// Filters: userId, country, dateFrom, dateTo, search (title/story).
// Pagination keeps response size bounded: default 24 photos/page
// (base64 is heavy — ~500 KB each is common), hard cap 60.
// ============================================
router.get('/photos', auth, adminOnly, async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit  = Math.min(parseInt(req.query.limit, 10) || 24, 60);
    const userId = (req.query.userId || '').trim();
    const country= (req.query.country || '').trim();
    const search = (req.query.search || '').trim().toLowerCase();
    const from   = req.query.from ? new Date(req.query.from) : null;
    const to     = req.query.to   ? new Date(req.query.to)   : null;

    const filter = { isDeleted: { $ne: true } };
    if (userId) filter._id = userId;
    if (country) filter.country = country;

    // Only pull fields we need. memories carry heavy base64 so we
    // still have to load them, but we strip visitedCountries/plans/etc.
    const users = await User.find(filter)
      .select('name email avatar country memories')
      .lean();

    // Flatten every photo into one row carrying the context an
    // admin needs to decide "download / contact user / investigate".
    const all = [];
    users.forEach(u => {
      (u.memories || []).forEach(m => {
        if (!m.photos || !m.photos.length) return;
        if (from && m.createdAt && new Date(m.createdAt) < from) return;
        if (to   && m.createdAt && new Date(m.createdAt) > to)   return;
        if (search) {
          const hay = `${m.title || ''} ${m.story || ''} ${m.country || ''} ${m.region || ''}`.toLowerCase();
          if (!hay.includes(search)) return;
        }
        m.photos.forEach((photo, idx) => {
          if (!photo) return;
          all.push({
            userId:         u._id,
            userName:       u.name,
            userEmail:      u.email,
            userCountry:    u.country,
            userAvatar:     u.avatar || null,
            memoryId:       m._id,
            memoryTitle:    m.title,
            memoryCountry:  m.country,
            memoryRegion:   m.region,
            dateVisited:    m.dateVisited,
            visibility:     m.visibility,
            isDemo:         !!m.isDemo,
            uploadedAt:     m.createdAt,
            photoIndex:     idx,
            // The actual base64 data URL. Lives in the response so the
            // admin UI can render + "Download" the file client-side
            // without a second roundtrip. Each payload is per-photo.
            photo,
          });
        });
      });
    });

    // Newest uploads first — most useful default for audit.
    all.sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0));

    const total = all.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const slice = all.slice(start, start + limit);

    res.json({
      photos: slice,
      total,
      page,
      limit,
      totalPages,
      // Lightweight distribution so the console can show filter chips
      // without a second request.
      byUser: aggregateCount(all, 'userName'),
      byCountry: aggregateCount(all, 'memoryCountry'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function aggregateCount(arr, key) {
  const map = new Map();
  arr.forEach(x => {
    const k = x[key] || 'Unknown';
    map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

module.exports = router;
