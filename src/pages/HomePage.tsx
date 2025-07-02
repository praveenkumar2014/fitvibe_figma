import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Zap,
  Clock,
  Heart
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useFitnessStore } from '../store/fitnessStore';
import { useNutritionStore } from '../store/nutritionStore';
import { StatsCard } from '../components/dashboard/StatsCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ProgressChart } from '../components/dashboard/ProgressChart';

export function HomePage() {
  const { user } = useAuthStore();
  const { weeklyStats, getWeeklyStats } = useFitnessStore();
  const { dailyGoals } = useNutritionStore();

  useEffect(() => {
    getWeeklyStats();
  }, [getWeeklyStats]);

  const stats = [
    {
      title: 'Workouts This Week',
      value: weeklyStats.workoutsCompleted,
      icon: Activity,
      color: 'text-primary-500',
      bgColor: 'bg-primary-100',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Calories Burned',
      value: weeklyStats.totalCalories,
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Minutes',
      value: weeklyStats.totalDuration,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      change: '+15%',
      changeType: 'positive' as const
    },
    {
      title: 'Streak Days',
      value: 7,
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      change: '+2',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-1">Ready to crush your fitness goals today?</p>
      </motion.div>

      {/* Daily Motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card gradient-bg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Today's Goal</h3>
            <p className="text-primary-100 mt-1">Burn 500 calories</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>320/500 cal</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '64%' }}></div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <QuickActions />
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ProgressChart />
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <RecentActivity />
      </motion.div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Health Insights</h3>
          <Heart className="w-5 h-5 text-red-500" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-green-800">Great Progress!</p>
              <p className="text-sm text-green-600">You're 20% ahead of your weekly goal</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-800">Stay Hydrated</p>
              <p className="text-sm text-blue-600">Drink 2 more glasses of water today</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">💧</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Upper Body Workout</p>
              <p className="text-sm text-gray-600">Today, 6:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nutrition Consultation</p>
              <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}