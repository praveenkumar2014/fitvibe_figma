import React from 'react';
import { Activity, Apple, Award } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'workout',
    title: 'Completed Upper Body Workout',
    time: '2 hours ago',
    icon: Activity,
    color: 'text-primary-500',
    bgColor: 'bg-primary-100'
  },
  {
    id: 2,
    type: 'nutrition',
    title: 'Logged healthy breakfast',
    time: '4 hours ago',
    icon: Apple,
    color: 'text-green-500',
    bgColor: 'bg-green-100'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Earned "Consistency" badge',
    time: '1 day ago',
    icon: Award,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100'
  }
];

export function RecentActivity() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}