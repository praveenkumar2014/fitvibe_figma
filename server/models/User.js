import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId && !this.linkedinId;
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'consultant', 'vendor', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  hasAccessPass: {
    type: Boolean,
    default: false
  },
  accessPassPurchasedAt: {
    type: Date,
    default: null
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'premium', 'pro'],
    default: 'free'
  },
  profile: {
    age: Number,
    height: Number,
    weight: Number,
    fitnessGoal: String,
    activityLevel: String,
    dietaryPreferences: [String],
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    bio: String,
    experience: String,
    specializations: [String],
    certifications: [String],
    hourlyRate: Number,
    availability: [{
      day: String,
      startTime: String,
      endTime: String
    }]
  },
  socialAuth: {
    googleId: String,
    linkedinId: String
  },
  verification: {
    emailToken: String,
    phoneToken: String,
    emailTokenExpires: Date,
    phoneTokenExpires: Date
  },
  resetPassword: {
    token: String,
    expires: Date
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginHistory: [{
    ip: String,
    userAgent: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'profile.location.coordinates': '2dsphere' });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if user has access (paid ₹500)
userSchema.methods.hasAccess = function() {
  return this.hasAccessPass || this.role === 'admin';
};

// Get user's location-based products
userSchema.methods.getLocationBasedProducts = function() {
  return this.profile?.location?.coordinates || null;
};

export default mongoose.model('User', userSchema);