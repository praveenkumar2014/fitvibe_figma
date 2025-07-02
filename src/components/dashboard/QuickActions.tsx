import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Calendar, ShoppingBag } from 'lucide-react';

const actions = [
  {
    title: 'Start Workout',
    icon: Play,
    color: 'bg-primary-500',
    to: '/fitness'
  },
  {
    title: 'Log Meal',
    icon: Plus,
    color: 'bg-green-500',
    to: '/nutrition'
  },
  {
    title: 'Book Session',
    icon: Calendar,
    color: 'bg-blue-500',
    to: '/consultation'
  },
  {
    title: 'Shop',
    icon: ShoppingBag,
    color: 'bg-purple-500',
    to: '/supplements'
  }
];

export function QuickActions() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link key={action.title} to={action.to}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-900">{action.title}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}