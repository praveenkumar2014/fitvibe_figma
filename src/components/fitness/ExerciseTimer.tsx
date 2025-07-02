import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ExerciseTimerProps {
  duration: number;
  onComplete: () => void;
}

export function ExerciseTimer({ duration, onComplete }: ExerciseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const handleReset = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  return (
    <div className="card text-center">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
            className="text-primary-500 transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          className="p-4 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <SkipForward className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
    </div>
  );
}