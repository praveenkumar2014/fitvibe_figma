import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Plus,
  Heart,
  ShoppingCart,
  Package
} from 'lucide-react';
import { SupplementCard } from '../components/supplements/SupplementCard';
import { CartSummary } from '../components/supplements/CartSummary';

const categories = [
  { id: 'all', label: 'All', icon: '🏪' },
  { id: 'protein', label: 'Protein', icon: '💪' },
  { id: 'vitamins', label: 'Vitamins', icon: '💊' },
  { id: 'pre-workout', label: 'Pre-Workout', icon: '⚡' },
  { id: 'recovery', label: 'Recovery', icon: '🔄' }
];

const supplements = [
  {
    id: '1',
    name: 'Whey Protein Isolate',
    brand: 'FitVibe Pro',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 1250,
    category: 'protein',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Premium whey protein isolate for muscle building and recovery',
    features: ['25g Protein', 'Low Carb', 'Fast Absorption'],
    inStock: true,
    bestseller: true
  },
  {
    id: '2',
    name: 'Multivitamin Complex',
    brand: 'Daily Essentials',
    price: 29.99,
    rating: 4.6,
    reviews: 890,
    category: 'vitamins',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Complete daily vitamin and mineral support',
    features: ['24 Vitamins', '60 Capsules', 'Daily Support'],
    inStock: true
  },
  {
    id: '3',
    name: 'Pre-Workout Energy',
    brand: 'Energy Boost',
    price: 39.99,
    rating: 4.7,
    reviews: 650,
    category: 'pre-workout',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'High-energy pre-workout formula for intense training',
    features: ['200mg Caffeine', 'Beta-Alanine', 'Citrulline'],
    inStock: true
  },
  {
    id: '4',
    name: 'BCAA Recovery',
    brand: 'Recovery Plus',
    price: 34.99,
    rating: 4.5,
    reviews: 420,
    category: 'recovery',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Essential amino acids for muscle recovery and growth',
    features: ['2:1:1 Ratio', 'Electrolytes', 'Sugar Free'],
    inStock: false
  }
];

export function SupplementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const filteredSupplements = supplements.filter(supplement => {
    const matchesCategory = selectedCategory === 'all' || supplement.category === selectedCategory;
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplement.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (supplement: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === supplement.id);
      if (existing) {
        return prev.map(item => 
          item.id === supplement.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...supplement, quantity: 1 }];
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplements</h1>
          <p className="text-gray-600 mt-1">Premium nutrition supplements</p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative p-2 bg-primary-500 rounded-lg text-white"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search supplements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10 pr-10"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Filter className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex space-x-2 overflow-x-auto scrollbar-hide"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card gradient-bg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Free Shipping</h3>
            <p className="text-primary-100 mt-1">On orders over $75</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.label}
          </h3>
          <span className="text-sm text-gray-600">
            {filteredSupplements.length} products
          </span>
        </div>

        <div className="space-y-4">
          {filteredSupplements.map((supplement, index) => (
            <SupplementCard
              key={supplement.id}
              supplement={supplement}
              onAddToCart={addToCart}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Cart Summary Modal */}
      {showCart && (
        <CartSummary
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={(id, quantity) => {
            if (quantity === 0) {
              setCartItems(prev => prev.filter(item => item.id !== id));
            } else {
              setCartItems(prev => prev.map(item => 
                item.id === id ? { ...item, quantity } : item
              ));
            }
          }}
        />
      )}
    </div>
  );
}