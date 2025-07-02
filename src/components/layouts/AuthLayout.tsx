import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img 
            src="/Fit with techi.png" 
            alt="FitVibe" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Welcome to FitVibe</h1>
          <p className="text-gray-600 mt-2">Your fitness journey starts here</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}