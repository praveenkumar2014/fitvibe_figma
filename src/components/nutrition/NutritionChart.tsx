import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyData = [
  { day: 'Mon', calories: 1850, protein: 120, carbs: 180, fat: 65 },
  { day: 'Tue', calories: 1920, protein: 135, carbs: 190, fat: 70 },
  { day: 'Wed', calories: 1780, protein: 115, carbs: 170, fat: 60 },
  { day: 'Thu', calories: 2100, protein: 150, carbs: 220, fat: 80 },
  { day: 'Fri', calories: 1950, protein: 140, carbs: 200, fat: 75 },
  { day: 'Sat', calories: 2200, protein: 160, carbs: 240, fat: 85 },
  { day: 'Sun', calories: 1850, protein: 125, carbs: 185, fat: 68 },
];

export function NutritionChart() {
  return (
    <div className="space-y-6">
      {/* Calories Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Calories</h3>
          <span className="text-sm text-gray-600">Last 7 days</span>
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
      </div>

      {/* Macros Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Macronutrients</h3>
          <span className="text-sm text-gray-600">Weekly average</span>
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
              <Bar dataKey="protein" fill="#22C55E" radius={[2, 2, 0, 0]} />
              <Bar dataKey="carbs" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="fat" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Protein</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Carbs</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Fat</span>
          </div>
        </div>
      </div>
    </div>
  );
}