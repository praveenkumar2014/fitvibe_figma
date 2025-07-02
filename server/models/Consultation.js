import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['fitness', 'nutrition', 'medical', 'wellness'],
    required: true
  },
  mode: {
    type: String,
    enum: ['video', 'audio', 'chat', 'in-person'],
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 120
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  pricing: {
    baseRate: {
      type: Number,
      required: true,
      min: 500
    },
    platformFee: {
      type: Number,
      default: 50
    },
    total: {
      type: Number,
      required: true
    }
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    transactionId: String,
    paidAt: Date
  },
  meeting: {
    platform: {
      type: String,
      enum: ['google-meet', 'jitsi', 'zoom'],
      default: 'google-meet'
    },
    meetingId: String,
    meetingUrl: String,
    password: String,
    startedAt: Date,
    endedAt: Date
  },
  notes: {
    userNotes: String,
    consultantNotes: String,
    adminNotes: String
  },
  feedback: {
    userRating: {
      type: Number,
      min: 1,
      max: 5
    },
    userReview: String,
    consultantRating: {
      type: Number,
      min: 1,
      max: 5
    },
    consultantReview: String
  },
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    scheduledAt: Date,
    notes: String
  },
  documents: [{
    name: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  prescription: {
    exercises: [{
      name: String,
      sets: Number,
      reps: Number,
      duration: String,
      instructions: String
    }],
    nutrition: [{
      meal: String,
      items: [String],
      timing: String,
      notes: String
    }],
    supplements: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String
    }],
    generalNotes: String
  }
}, {
  timestamps: true
});

// Indexes
consultationSchema.index({ user: 1 });
consultationSchema.index({ consultant: 1 });
consultationSchema.index({ scheduledAt: 1 });
consultationSchema.index({ status: 1 });
consultationSchema.index({ type: 1 });

// Calculate total price
consultationSchema.pre('save', function(next) {
  if (this.isModified('pricing.baseRate') || this.isModified('pricing.platformFee')) {
    this.pricing.total = this.pricing.baseRate + this.pricing.platformFee;
  }
  next();
});

// Generate meeting URL
consultationSchema.methods.generateMeetingUrl = async function() {
  const meetingId = `fitvibe-${this._id}-${Date.now()}`;
  
  switch (this.meeting.platform) {
    case 'google-meet':
      // Integration with Google Meet API would go here
      this.meeting.meetingUrl = `https://meet.google.com/${meetingId}`;
      break;
    case 'jitsi':
      this.meeting.meetingUrl = `https://meet.jit.si/FitVibe-${meetingId}`;
      break;
    default:
      this.meeting.meetingUrl = `https://meet.jit.si/FitVibe-${meetingId}`;
  }
  
  this.meeting.meetingId = meetingId;
  return this.save();
};

// Check if consultation can be started
consultationSchema.methods.canStart = function() {
  const now = new Date();
  const scheduledTime = new Date(this.scheduledAt);
  const timeDiff = Math.abs(now - scheduledTime) / (1000 * 60); // minutes
  
  return timeDiff <= 15 && this.status === 'confirmed' && this.payment.status === 'completed';
};

export default mongoose.model('Consultation', consultationSchema);