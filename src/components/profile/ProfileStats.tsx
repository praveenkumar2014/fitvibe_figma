import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyData = [
  { day: 'Mon', workouts: 1, calories: 320 },
  { day: 'Tue', workouts: 0, calories: 0 },
  { day: 'Wed', workouts: 1, calories: 450 },
  { day: 'Thu', workouts: 1, calories: 380 },
  { day: 'Fri', workouts: 0, calories: 0 },
  { day: 'Sat', workouts: 2, calories: 600 },
  { day: 'Sun', workouts: 1, calories: 480 },
];

const monthlyGoals = [
  { month: 'Jan', target: 20, completed: 18 },
  { month: 'Feb', target: 22, completed: 24 },
  { month: 'Mar', target: 25, completed: 22 },
  { month: 'Apr', target: 25, completed: 28 },
];

export function ProfileStats() {
  return (
    <div className="space-y-6">
      {/* Weekly Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Bar dataKey="workouts" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">Workouts completed this week</p>
      </div>

      {/* Calories Burned */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Calories Burned</h3>
          <TrendingUp className="w-5 h-5 text-gray-500" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#22C55E" 
                strokeWidth={3}
                dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22C55E', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">Total: 2,230 calories this week</p>
      </div>

      {/* Monthly Goals */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Goals</h3>
          <Target className="w-5 h-5 text-gray-500" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyGoals}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
        </div>
      </div>

      {/* Personal Records */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Records</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Longest Workout</p>
                <p className="text-sm text-gray-600">Upper Body Strength</p>
              </div>
            </div>
            <span className="font-bold text-gray-900">85 min</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Most Calories</p>
                <p className="text-sm text-gray-600">HIIT Session</p>
              </div>
            </div>
            <span className="font-bold text-gray-900">650 cal</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Current Streak</p>
                <p className="text-sm text-gray-600">Daily workouts</p>
              </div>
            </div>
            <span className="font-bold text-gray-900">7 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}