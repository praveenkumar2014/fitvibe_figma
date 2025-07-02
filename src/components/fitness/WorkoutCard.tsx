import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Zap, Star } from 'lucide-react';

interface WorkoutCardProps {
  workout: {
    id: string;
    name: string;
    duration: number;
    calories: number;
    difficulty: string;
    exercises: string[];
    image: string;
  };
  delay?: number;
}

export function WorkoutCard({ workout, delay = 0 }: WorkoutCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={workout.image} 
          alt={workout.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center"
          >
            <Play className="w-6 h-6 text-primary-500 ml-1" />
          </motion.button>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900 mb-2">{workout.name}</h4>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {workout.duration} min
          </div>
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            {workout.calories} cal
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            4.8
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {exercise}
            </span>
          ))}
          {workout.exercises.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{workout.exercises.length - 3} more
            </span>
          )}
        </div>
        
        <button className="btn-primary w-full">
          Start Workout
        </button>
      </div>
    </motion.div>
  );
}