import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', calories: 320 },
  { day: 'Tue', calories: 450 },
  { day: 'Wed', calories: 380 },
  { day: 'Thu', calories: 520 },
  { day: 'Fri', calories: 410 },
  { day: 'Sat', calories: 600 },
  { day: 'Sun', calories: 480 },
];

export function ProgressChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
        <span className="text-sm text-gray-600">Calories Burned</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
  );
}