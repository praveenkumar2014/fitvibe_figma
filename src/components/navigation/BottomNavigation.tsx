import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, Apple, ShoppingBag, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/fitness', icon: Activity, label: 'Fitness' },
  { to: '/nutrition', icon: Apple, label: 'Nutrition' },
  { to: '/supplements', icon: ShoppingBag, label: 'Shop' },
  { to: '/consultation', icon: Calendar, label: 'Consult' },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-tab flex-col space-y-1 ${isActive ? 'active' : 'inactive'}`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-2 bg-primary-500 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
                <span className="text-xs font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}