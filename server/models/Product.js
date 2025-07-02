import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['protein', 'vitamins', 'pre-workout', 'recovery', 'equipment', 'accessories']
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: {
    weight: String,
    servings: Number,
    ingredients: [String],
    nutritionFacts: {
      protein: String,
      carbs: String,
      fat: String,
      calories: String,
      fiber: String,
      sugar: String
    },
    allergens: [String],
    instructions: String
  },
  inventory: {
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    sku: {
      type: String,
      unique: true,
      required: true
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    }
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availability: {
    locations: [{
      state: String,
      cities: [String],
      deliveryTime: String,
      shippingCost: Number
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    images: [String],
    isVerified: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ 'availability.locations.state': 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Check if product is in stock
productSchema.virtual('inStock').get(function() {
  return this.inventory.stock > 0;
});

// Check if stock is low
productSchema.virtual('isLowStock').get(function() {
  return this.inventory.stock <= this.inventory.lowStockThreshold;
});

// Update average rating
productSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings.average = Number((sum / this.reviews.length).toFixed(1));
    this.ratings.count = this.reviews.length;
  }
  return this.save();
};

export default mongoose.model('Product', productSchema);