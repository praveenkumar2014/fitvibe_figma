import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Apple, 
  Plus, 
  Target, 
  TrendingUp,
  Calendar,
  Droplets,
  Clock,
  ChefHat
} from 'lucide-react';
import { useNutritionStore } from '../store/nutritionStore';
import { MealPlanCard } from '../components/nutrition/MealPlanCard';
import { FoodLogger } from '../components/nutrition/FoodLogger';
import { NutritionChart } from '../components/nutrition/NutritionChart';

export function NutritionPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'plans' | 'progress'>('today');
  const { mealPlans, dailyGoals, foodLogs } = useNutritionStore();

  const today = new Date().toISOString().split('T')[0];
  const todayLog = foodLogs.find(log => log.date === today);

  const tabs = [
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'plans', label: 'Meal Plans', icon: ChefHat },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  const macroData = [
    {
      name: 'Protein',
      current: todayLog?.totalCalories ? Math.round(todayLog.totalCalories * 0.3 / 4) : 0,
      target: dailyGoals.protein,
      color: '#22C55E',
      unit: 'g'
    },
    {
      name: 'Carbs',
      current: todayLog?.totalCalories ? Math.round(todayLog.totalCalories * 0.45 / 4) : 0,
      target: dailyGoals.carbs,
      color: '#3B82F6',
      unit: 'g'
    },
    {
      name: 'Fat',
      current: todayLog?.totalCalories ? Math.round(todayLog.totalCalories * 0.25 / 9) : 0,
      target: dailyGoals.fat,
      color: '#F59E0B',
      unit: 'g'
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
        <p className="text-gray-600 mt-1">Track your meals and reach your nutrition goals</p>
      </motion.div>

      {/* Daily Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card gradient-bg text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Today's Calories</h3>
            <p className="text-primary-100">
              {todayLog?.totalCalories || 0} / {dailyGoals.calories} cal
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Apple className="w-8 h-8" />
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min(((todayLog?.totalCalories || 0) / dailyGoals.calories) * 100, 100)}%` 
            }}
          />
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex bg-gray-100 rounded-xl p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-primary-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'today' && (
          <div className="space-y-6">
            {/* Macros Overview */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Macronutrients</h3>
              <div className="grid grid-cols-3 gap-4">
                {macroData.map((macro) => {
                  const percentage = (macro.current / macro.target) * 100;
                  return (
                    <div key={macro.name} className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={macro.color}
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-900">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{macro.name}</p>
                      <p className="text-xs text-gray-600">
                        {macro.current}/{macro.target}{macro.unit}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Water Intake */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Water Intake</h3>
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">
                  {todayLog?.waterIntake || 0} / {dailyGoals.water} ml
                </span>
                <button className="btn-ghost text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(((todayLog?.waterIntake || 0) / dailyGoals.water) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>

            {/* Food Logger */}
            <FoodLogger />
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Meal Plans</h3>
              <button className="btn-ghost text-sm">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </button>
            </div>
            
            <div className="space-y-4">
              {mealPlans.map((plan, index) => (
                <MealPlanCard key={plan.id} plan={plan} delay={index * 0.1} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <NutritionChart />
            
            {/* Weekly Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Daily Calories</span>
                  <span className="font-medium">1,850 cal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Meals Logged</span>
                  <span className="font-medium">18/21</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Goal Met</span>
                  <span className="font-medium">5/7 days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}