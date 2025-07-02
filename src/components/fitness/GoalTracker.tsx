import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, TrendingUp, Calendar } from 'lucide-react';
import { FitnessGoal } from '../../store/fitnessStore';

interface GoalTrackerProps {
  goals: FitnessGoal[];
}

export function GoalTracker({ goals }: GoalTrackerProps) {
  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return '🏃‍♀️';
      case 'muscle_gain':
        return '💪';
      case 'endurance':
        return '🏃‍♂️';
      case 'strength':
        return '🏋️‍♀️';
      default:
        return '🎯';
    }
  };

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return 'bg-red-100 text-red-800';
      case 'muscle_gain':
        return 'bg-blue-100 text-blue-800';
      case 'endurance':
        return 'bg-green-100 text-green-800';
      case 'strength':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Fitness Goals</h3>
        <button className="btn-ghost text-sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Goal
        </button>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="card text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No goals set yet</p>
          <p className="text-sm text-gray-500 mt-1">Create your first fitness goal to get started</p>
          <button className="btn-primary mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getGoalIcon(goal.type)}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {goal.type.replace('_', ' ')}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getGoalColor(goal.type)}`}>
                        {goal.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    On track
                  </div>
                  <button className="text-primary-500 text-sm font-medium hover:text-primary-600">
                    Update Progress
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick Goal Templates */}
      <div className="card">
        <h4 className="font-medium text-gray-900 mb-4">Quick Goal Templates</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { type: 'weight_loss', label: 'Lose Weight', icon: '🏃‍♀️' },
            { type: 'muscle_gain', label: 'Build Muscle', icon: '💪' },
            { type: 'endurance', label: 'Improve Endurance', icon: '🏃‍♂️' },
            { type: 'strength', label: 'Get Stronger', icon: '🏋️‍♀️' }
          ].map((template) => (
            <button
              key={template.type}
              className="p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-left"
            >
              <div className="text-lg mb-1">{template.icon}</div>
              <p className="text-sm font-medium text-gray-900">{template.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}