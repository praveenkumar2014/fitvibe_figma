import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Plus, 
  Timer, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Dumbbell,
  Heart,
  Zap
} from 'lucide-react';
import { useFitnessStore } from '../store/fitnessStore';
import { WorkoutCard } from '../components/fitness/WorkoutCard';
import { ExerciseTimer } from '../components/fitness/ExerciseTimer';
import { GoalTracker } from '../components/fitness/GoalTracker';

export function FitnessPage() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'goals' | 'progress'>('workouts');
  const { workouts, goals, addWorkout } = useFitnessStore();

  const featuredWorkouts = [
    {
      id: '1',
      name: 'Morning HIIT',
      duration: 20,
      calories: 250,
      difficulty: 'Intermediate',
      exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      name: 'Upper Body Strength',
      duration: 45,
      calories: 320,
      difficulty: 'Advanced',
      exercises: ['Push-ups', 'Pull-ups', 'Dips'],
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      name: 'Yoga Flow',
      duration: 30,
      calories: 150,
      difficulty: 'Beginner',
      exercises: ['Sun Salutation', 'Warrior Pose', 'Tree Pose'],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const tabs = [
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
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
        <h1 className="text-2xl font-bold text-gray-900">Fitness Tracker</h1>
        <p className="text-gray-600 mt-1">Track your workouts and achieve your goals</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="card text-center">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Zap className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">1,250</p>
          <p className="text-xs text-gray-600">Calories</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Timer className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">45</p>
          <p className="text-xs text-gray-600">Minutes</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">142</p>
          <p className="text-xs text-gray-600">Avg BPM</p>
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
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            {/* Featured Workouts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Featured Workouts</h3>
                <button className="btn-ghost text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Create
                </button>
              </div>
              <div className="space-y-3">
                {featuredWorkouts.map((workout, index) => (
                  <WorkoutCard key={workout.id} workout={workout} delay={index * 0.1} />
                ))}
              </div>
            </div>

            {/* Recent Workouts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
              {workouts.length === 0 ? (
                <div className="card text-center py-8">
                  <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No workouts yet</p>
                  <p className="text-sm text-gray-500 mt-1">Start your first workout to see it here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workouts.slice(0, 3).map((workout) => (
                    <div key={workout.id} className="card">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{workout.name}</h4>
                          <p className="text-sm text-gray-600">
                            {workout.duration} min • {workout.calories} cal
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          workout.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <GoalTracker goals={goals} />
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Workouts Completed</span>
                    <span className="font-medium">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Calories Burned</span>
                    <span className="font-medium">1,250/1,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Active Minutes</span>
                    <span className="font-medium">180/210</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">7-Day Streak</p>
                    <p className="text-sm text-gray-600">Completed workouts for 7 days straight</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Goal Crusher</p>
                    <p className="text-sm text-gray-600">Exceeded weekly calorie goal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}