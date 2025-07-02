import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, ShoppingCart } from 'lucide-react';

interface SupplementCardProps {
  supplement: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    features: string[];
    inStock: boolean;
    bestseller?: boolean;
  };
  onAddToCart: (supplement: any) => void;
  delay?: number;
}

export function SupplementCard({ supplement, onAddToCart, delay = 0 }: SupplementCardProps) {
  const discount = supplement.originalPrice 
    ? Math.round(((supplement.originalPrice - supplement.price) / supplement.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={supplement.image} 
          alt={supplement.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          {supplement.bestseller && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        {!supplement.inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-gray-600">{supplement.brand}</p>
            <h4 className="font-semibold text-gray-900">{supplement.name}</h4>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {supplement.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${supplement.originalPrice}
                </span>
              )}
              <span className="text-lg font-bold text-gray-900">
                ${supplement.price}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{supplement.description}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900 ml-1">
              {supplement.rating}
            </span>
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({supplement.reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {supplement.features.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>

        <button
          onClick={() => supplement.inStock && onAddToCart(supplement)}
          disabled={!supplement.inStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            supplement.inStock
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {supplement.inStock ? (
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </div>
          ) : (
            'Out of Stock'
          )}
        </button>
      </div>
    </motion.div>
  );
}