import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut,
  Edit,
  Camera,
  Award,
  Target,
  Activity,
  Calendar
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ProfileStats } from '../components/profile/ProfileStats';
import { SettingsModal } from '../components/profile/SettingsModal';

export function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'settings'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'stats', label: 'Stats', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const menuItems = [
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: CreditCard, label: 'Payment Methods', action: () => {} },
    { icon: Settings, label: 'App Settings', action: () => setShowSettings(true) },
    { icon: LogOut, label: 'Sign Out', action: logout, danger: true }
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', description: 'Completed workouts for 7 days', icon: '🔥', earned: true },
    { id: 2, title: 'First Goal', description: 'Set your first fitness goal', icon: '🎯', earned: true },
    { id: 3, title: 'Nutrition Master', description: 'Logged meals for 30 days', icon: '🥗', earned: false },
    { id: 4, title: 'Social Butterfly', description: 'Shared 10 workouts', icon: '🦋', earned: false }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card text-center"
      >
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        
        <div className="flex items-center justify-center mt-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user?.subscription === 'premium' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {user?.subscription === 'premium' ? '⭐ Premium' : '🆓 Free'}
          </span>
        </div>

        <button className="btn-ghost mt-4">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex bg-gray-100 rounded-xl p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-primary-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-primary-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-600">Workouts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-600">Goals</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">2</p>
                  <p className="text-xs text-gray-600">Badges</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        achievement.earned ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Completed Upper Body Workout</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Updated weight loss goal</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <ProfileStats />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  item.danger 
                    ? 'border-red-200 hover:border-red-300 hover:bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${
                    item.danger ? 'text-red-500' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium ${
                    item.danger ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {item.label}
                  </span>
                </div>
                <span className="text-gray-400">›</span>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}