import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  ShoppingBag, 
  Calendar,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const menuItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/workouts', icon: Activity, label: 'Workouts' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/consultations', icon: Calendar, label: 'Consultations' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' }
];

export function AdminSidebar() {
  const { logout } = useAuthStore();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src="/Fit with techi.png" alt="FitVibe" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gray-900">FitVibe Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}