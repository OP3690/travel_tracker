const mongoose = require('mongoose');

// Reusable sub-schemas for structured data
const visitedRegionSchema = new mongoose.Schema({
  id: { type: String, required: true },        // region ID from map data
  name: { type: String, required: true },       // region display name
  type: { type: String, default: 'region' },    // 'state', 'country', 'province', etc.
  country: String,                              // parent country (for states) — empty for countries
  dateVisited: Date,                            // optional visit date
  comment: String,                              // optional note
  visitedAt: { type: Date, default: Date.now }, // when marked visited in app
}, { _id: false });

const destinationEntrySchema = new mongoose.Schema({
  state: { type: String, required: true },
  destination: { type: String, required: true },
  country: String,                              // country context
  dateVisited: Date,
  note: String,
  rating: { type: Number, min: 1, max: 5 },
  visitedAt: { type: Date, default: Date.now },
}, { _id: false });

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 120 },
  country: String,
  region: String,                               // state/province name (optional)
  story: { type: String, maxlength: 8000 },     // ~1000 words avg
  photos: [String],                             // base64 data URLs (max 5 enforced in route)
  dateVisited: Date,
  visibility: { type: String, enum: ['public', 'friends', 'private'], default: 'friends', index: true },
  isDemo: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const friendRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const sentRequestSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const sentInviteSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const tripItineraryDaySchema = new mongoose.Schema({
  day: Number,
  date: Date,
  title: String,
  activities: [String],
}, { _id: false });

const tripCoTravelerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // null if invited-only
  name: String,
  email: { type: String, lowercase: true, trim: true },
  status: { type: String, enum: ['friend', 'invited'], default: 'friend' },
  addedAt: { type: Date, default: Date.now },
}, { _id: false });

const tripBookingSchema = new mongoose.Schema({
  type: { type: String, enum: ['flight', 'hotel', 'car', 'train', 'activity', 'other'], default: 'other' },
  title: String,
  confirmation: String,
  url: String,
  cost: Number,
  date: Date,
}, { _id: false });

const tripChecklistSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  category: { type: String, enum: ['documents', 'packing', 'booking', 'essentials', 'activities', 'other'], default: 'other' },
}, { _id: false });

const tripPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: String,
  country: String,
  region: String,
  cities: [String],
  tripType: { type: String, enum: ['domestic', 'international'], default: 'international' },
  purpose: { type: String, enum: ['leisure', 'business', 'family', 'adventure', 'honeymoon', 'road-trip', 'solo', 'other'], default: 'leisure' },
  travelers: { type: Number, default: 1, min: 1, max: 50 },
  status: { type: String, enum: ['idea', 'planning', 'booked', 'completed', 'cancelled'], default: 'planning', index: true },

  startDate: Date,
  endDate: Date,

  budget: {
    estimated: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
  },

  notes: String,
  checklist: [tripChecklistSchema],
  itinerary: [tripItineraryDaySchema],
  bookings: [tripBookingSchema],
  coTravelers: [tripCoTravelerSchema],

  // Legacy — kept so older docs still render
  completed: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  // --- Identity ---
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    index: true,
  },
  password: { type: String, required: true, minlength: 6, select: false },

  // --- Contact ---
  mobile: String,
  phoneCode: { type: String, default: '+1' },   // e.g., "+91", "+1-268"

  // --- Profile ---
  country: { type: String, default: 'USA', index: true },
  bio: { type: String, maxlength: 500 },
  avatar: String,                               // URL or initials
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },

  // --- Preferences ---
  theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'dark' },
  units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
  language: { type: String, default: 'en' },

  // --- Social handles (shown on shareable stamp cards) ---
  social: {
    instagram: { type: String, trim: true },
    facebook:  { type: String, trim: true },
    pinterest: { type: String, trim: true },
    snapchat:  { type: String, trim: true },
    tiktok:    { type: String, trim: true },
    twitter:   { type: String, trim: true },
  },
  cardTemplate: { type: String, default: 'midnight' },

  // --- Travel Data (structured) ---
  selectedLocations: [mongoose.Schema.Types.Mixed], // legacy — visited regions on maps

  visitedRegions: [visitedRegionSchema],         // new structured version
  visitedCountries: [{                           // dedicated world map data
    id: String,
    name: { type: String, required: true },
    dateVisited: Date,
    comment: String,
    visitedAt: { type: Date, default: Date.now },
  }],

  visitedDestinations: [destinationEntrySchema], // destinations within regions
  userDestinations: [destinationEntrySchema],    // user-added destinations

  // --- Trip Planner (moved from localStorage) ---
  tripPlans: [tripPlanSchema],

  // --- Memories (photos + story per place) ---
  memories: [memorySchema],

  // --- Friends / Social ---
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
  friendRequests: [friendRequestSchema],         // incoming requests
  sentRequests: [sentRequestSchema],             // outgoing requests
  sentInvites: [sentInviteSchema],               // invites sent to non-users

  // --- Password Reset OTP ---
  resetOtp: { type: String, select: false },
  resetOtpExpires: { type: Date, select: false },
  resetOtpAttempts: { type: Number, default: 0, select: false },
  resetToken: { type: String, select: false },   // issued after successful OTP verify
  resetTokenExpires: { type: Date, select: false },

  // --- Milestones / Achievements ---
  milestones: [{
    id: String,                                 // 'first-step', 'explorer', etc.
    label: String,
    unlockedAt: { type: Date, default: Date.now },
  }],

  // --- Roles / Access ---
  role: { type: String, enum: ['user', 'admin'], default: 'user', index: true },

  // --- Email Verification ---
  emailVerified: { type: Boolean, default: false },
  emailVerifyToken: { type: String, select: false },
  emailVerifyTokenExpiry: { type: Date, select: false },

  // --- Login Tracking ---
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },

  // --- Friends feed seen marker ---
  // Timestamp of the last time this user opened the Friends page (or
  // otherwise acknowledged their friends' activity). We compare this
  // against each friend memory's createdAt to count new posts since.
  friendsFeedSeenAt: Date,

  // --- Soft Delete ---
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: Date,
}, {
  timestamps: true,  // auto adds createdAt + updatedAt
});

// Compound index for fast country+role queries
userSchema.index({ country: 1, role: 1 });

// Virtual: full phone number
userSchema.virtual('fullPhone').get(function() {
  return this.phoneCode && this.mobile ? `${this.phoneCode} ${this.mobile}` : this.mobile;
});

// Hide sensitive fields in JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.emailVerifyToken;
  delete obj.emailVerifyTokenExpiry;
  delete obj.resetToken;
  delete obj.resetTokenExpires;
  delete obj.resetOtp;
  delete obj.resetOtpExpires;
  delete obj.resetOtpAttempts;
  return obj;
};

// Helper: is admin
userSchema.methods.isAdminUser = function() {
  return this.role === 'admin' || this.email === 'global5665@gmail.com';
};

module.exports = mongoose.model('User', userSchema);
