import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Clock } from 'lucide-react';

const mealTypes = [
  { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { id: 'lunch', label: 'Lunch', icon: '☀️' },
  { id: 'dinner', label: 'Dinner', icon: '🌙' },
  { id: 'snacks', label: 'Snacks', icon: '🍎' }
];

const quickFoods = [
  { name: 'Banana', calories: 105, icon: '🍌' },
  { name: 'Greek Yogurt', calories: 130, icon: '🥛' },
  { name: 'Almonds (1oz)', calories: 164, icon: '🥜' },
  { name: 'Apple', calories: 95, icon: '🍎' }
];

export function FoodLogger() {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Log Food</h3>
        <button className="btn-ghost text-sm">
          <Search className="w-4 h-4 mr-1" />
          Search
        </button>
      </div>

      {/* Meal Type Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {mealTypes.map((meal) => (
          <button
            key={meal.id}
            onClick={() => setSelectedMeal(meal.id)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              selectedMeal === meal.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg mb-1">{meal.icon}</div>
            <p className="text-sm font-medium text-gray-900">{meal.label}</p>
          </button>
        ))}
      </div>

      {/* Quick Add Foods */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-3">Quick Add</h4>
        <div className="space-y-2">
          {quickFoods.map((food, index) => (
            <motion.button
              key={food.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{food.icon}</span>
                <span className="font-medium text-gray-900">{food.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{food.calories} cal</span>
                <Plus className="w-4 h-4 text-primary-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Foods */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Recent Foods</h4>
          <Clock className="w-4 h-4 text-gray-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🥗</span>
              <span className="font-medium text-gray-900">Caesar Salad</span>
            </div>
            <span className="text-sm text-gray-600">320 cal</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🍗</span>
              <span className="font-medium text-gray-900">Grilled Chicken</span>
            </div>
            <span className="text-sm text-gray-600">185 cal</span>
          </div>
        </div>
      </div>
    </div>
  );
}