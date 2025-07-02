import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ChefHat } from 'lucide-react';
import { MealPlan } from '../../store/nutritionStore';

interface MealPlanCardProps {
  plan: MealPlan;
  delay?: number;
}

export function MealPlanCard({ plan, delay = 0 }: MealPlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{plan.name}</h4>
            <p className="text-sm text-gray-600">{plan.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">4.8</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{plan.duration}</p>
          <p className="text-xs text-gray-600">Days</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{plan.totalCalories}</p>
          <p className="text-xs text-gray-600">Calories</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{plan.macros.protein}g</p>
          <p className="text-xs text-gray-600">Protein</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          {plan.duration} day plan
        </div>
        <button className="btn-primary text-sm px-4 py-2">
          Start Plan
        </button>
      </div>
    </motion.div>
  );
}