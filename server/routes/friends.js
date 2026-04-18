const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const email = require('../services/email');
const router = express.Router();

// ============================================
// GET friends list + pending requests + sent requests
// ============================================
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('friends', 'name email country avatar')
      .populate('friendRequests.from', 'name email country avatar')
      .populate('sentRequests.to', 'name email country avatar');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      friends: user.friends || [],
      incoming: (user.friendRequests || []).map(r => ({ user: r.from, createdAt: r.createdAt })),
      outgoing: (user.sentRequests || []).map(r => ({ user: r.to, createdAt: r.createdAt })),
      invitesSent: user.sentInvites || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Search users by email (to send request)
// ============================================
router.get('/search', auth, async (req, res) => {
  try {
    const q = String(req.query.q || '').trim().toLowerCase();
    if (!q || q.length < 3) return res.json({ users: [] });
    const users = await User.find({
      email: { $regex: q, $options: 'i' },
      _id: { $ne: req.userId },
      isDeleted: { $ne: true },
    }).limit(10).select('name email country avatar');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Send friend request to an existing user
// ============================================
router.post('/request', auth, async (req, res) => {
  try {
    const { userId, email: targetEmail } = req.body;
    if (!userId && !targetEmail) return res.status(400).json({ error: 'userId or email required' });

    const target = userId
      ? await User.findById(userId)
      : await User.findOne({ email: String(targetEmail).toLowerCase() });

    if (!target || target.isDeleted) return res.status(404).json({ error: 'User not found' });
    if (target._id.toString() === req.userId) return res.status(400).json({ error: "Can't friend yourself" });

    const me = await User.findById(req.userId);
    if (!me) return res.status(404).json({ error: 'User not found' });

    // Already friends?
    if (me.friends.some(id => id.toString() === target._id.toString())) {
      return res.status(400).json({ error: 'Already friends' });
    }
    // Request already pending from me?
    if (me.sentRequests.some(r => r.to.toString() === target._id.toString())) {
      return res.status(400).json({ error: 'Request already sent' });
    }
    // Request already pending FROM them → auto-accept
    if (me.friendRequests.some(r => r.from.toString() === target._id.toString())) {
      me.friends.push(target._id);
      target.friends.push(me._id);
      me.friendRequests = me.friendRequests.filter(r => r.from.toString() !== target._id.toString());
      target.sentRequests = target.sentRequests.filter(r => r.to.toString() !== me._id.toString());
      await Promise.all([me.save(), target.save()]);
      return res.json({ message: 'You are now friends', status: 'friends' });
    }

    me.sentRequests.push({ to: target._id });
    target.friendRequests.push({ from: me._id });
    await Promise.all([me.save(), target.save()]);

    email.sendFriendRequestEmail({ toUser: target, fromUser: me })
      .catch(err => console.error('friend request email failed:', err.message));

    res.json({ message: 'Friend request sent', status: 'requested' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Accept incoming friend request
// ============================================
router.post('/accept/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const me = await User.findById(req.userId);
    const other = await User.findById(userId);
    if (!me || !other) return res.status(404).json({ error: 'User not found' });

    const hasRequest = me.friendRequests.some(r => r.from.toString() === userId);
    if (!hasRequest) return res.status(400).json({ error: 'No request from this user' });

    me.friendRequests = me.friendRequests.filter(r => r.from.toString() !== userId);
    other.sentRequests = other.sentRequests.filter(r => r.to.toString() !== req.userId);
    if (!me.friends.some(id => id.toString() === userId)) me.friends.push(other._id);
    if (!other.friends.some(id => id.toString() === req.userId)) other.friends.push(me._id);

    await Promise.all([me.save(), other.save()]);
    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Decline incoming request
// ============================================
router.post('/decline/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const me = await User.findById(req.userId);
    const other = await User.findById(userId);
    if (!me || !other) return res.status(404).json({ error: 'User not found' });

    me.friendRequests = me.friendRequests.filter(r => r.from.toString() !== userId);
    other.sentRequests = other.sentRequests.filter(r => r.to.toString() !== req.userId);
    await Promise.all([me.save(), other.save()]);
    res.json({ message: 'Request declined' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Cancel outgoing request
// ============================================
router.post('/cancel/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const me = await User.findById(req.userId);
    const other = await User.findById(userId);
    if (!me || !other) return res.status(404).json({ error: 'User not found' });

    me.sentRequests = me.sentRequests.filter(r => r.to.toString() !== userId);
    other.friendRequests = other.friendRequests.filter(r => r.from.toString() !== req.userId);
    await Promise.all([me.save(), other.save()]);
    res.json({ message: 'Request cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Unfriend
// ============================================
router.delete('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const me = await User.findById(req.userId);
    const other = await User.findById(userId);
    if (!me) return res.status(404).json({ error: 'User not found' });
    me.friends = me.friends.filter(id => id.toString() !== userId);
    if (other) other.friends = other.friends.filter(id => id.toString() !== req.userId);
    await Promise.all([me.save(), other ? other.save() : Promise.resolve()]);
    res.json({ message: 'Unfriended' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Invite a NON-user by email
// ============================================
router.post('/invite', auth, async (req, res) => {
  try {
    const { email: inviteEmail, message } = req.body;
    if (!inviteEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
      return res.status(400).json({ error: 'Valid email required' });
    }
    const me = await User.findById(req.userId);
    if (!me) return res.status(404).json({ error: 'User not found' });

    // If that email is already a user, send a friend request instead
    const existing = await User.findOne({ email: inviteEmail.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        error: 'That email is already on StampYourMap. Send a friend request instead.',
        userId: existing._id,
      });
    }

    // Track invite (dedupe)
    if (!me.sentInvites.some(inv => inv.email === inviteEmail.toLowerCase())) {
      me.sentInvites.push({ email: inviteEmail.toLowerCase() });
      await me.save();
    }

    email.sendInviteEmail({ fromUser: me, toEmail: inviteEmail, personalMessage: message })
      .catch(err => console.error('invite email failed:', err.message));

    res.json({ message: `Invite sent to ${inviteEmail}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Get a friend's public profile + visible memories
// (only public+friends-only memories if they're your friend; only public if not)
// ============================================
router.get('/:userId/profile', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const me = await User.findById(req.userId);
    const other = await User.findById(userId);
    if (!other || other.isDeleted) return res.status(404).json({ error: 'User not found' });

    const isSelf = userId === req.userId;
    const isFriend = me && me.friends.some(id => id.toString() === userId);

    let visibleMemories = [];
    if (isSelf) {
      visibleMemories = other.memories;
    } else if (isFriend) {
      visibleMemories = (other.memories || []).filter(m => m.visibility !== 'private');
    } else {
      visibleMemories = (other.memories || []).filter(m => m.visibility === 'public');
    }

    // Newest first
    visibleMemories = [...visibleMemories].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      user: {
        _id: other._id,
        name: other.name,
        country: other.country,
        avatar: other.avatar,
        bio: other.bio,
        visitedCountries: other.visitedCountries || [],
        memoriesCount: (other.memories || []).length,
        friendsCount: (other.friends || []).length,
      },
      relation: isSelf ? 'self' : isFriend ? 'friend' : 'none',
      memories: visibleMemories,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Aggregated feed — latest memories from ALL friends (+ my own)
// ============================================
router.get('/feed', auth, async (req, res) => {
  try {
    const me = await User.findById(req.userId).populate('friends', 'name country avatar memories');
    if (!me) return res.status(404).json({ error: 'User not found' });

    const items = [];
    // My own
    for (const m of me.memories || []) {
      items.push({
        memory: m.toObject ? m.toObject() : m,
        author: { _id: me._id, name: me.name, country: me.country, avatar: me.avatar, isSelf: true },
      });
    }
    // Friends' public + friends-only
    for (const fr of me.friends || []) {
      for (const m of fr.memories || []) {
        if (m.visibility === 'private') continue;
        items.push({
          memory: m.toObject ? m.toObject() : m,
          author: { _id: fr._id, name: fr.name, country: fr.country, avatar: fr.avatar, isSelf: false },
        });
      }
    }

    items.sort((a, b) => new Date(b.memory.createdAt) - new Date(a.memory.createdAt));
    res.json({ feed: items.slice(0, 100) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
