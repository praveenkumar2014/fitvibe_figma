import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Shield, Moon, Globe, Volume2 } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);
  const [language, setLanguage] = useState('en');

  const settings = [
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Receive workout reminders and updates',
      value: notifications,
      onChange: setNotifications,
      type: 'toggle'
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Switch to dark theme',
      value: darkMode,
      onChange: setDarkMode,
      type: 'toggle'
    },
    {
      icon: Volume2,
      title: 'Sound Effects',
      description: 'Play sounds for interactions',
      value: sounds,
      onChange: setSounds,
      type: 'toggle'
    },
    {
      icon: Globe,
      title: 'Language',
      description: 'Choose your preferred language',
      value: language,
      onChange: setLanguage,
      type: 'select',
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">App Settings</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            {settings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <setting.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{setting.title}</p>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                </div>

                {setting.type === 'toggle' && (
                  <button
                    onClick={() => setting.onChange(!setting.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.value ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}

                {setting.type === 'select' && (
                  <select
                    value={setting.value}
                    onChange={(e) => setting.onChange(e.target.value)}
                    className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {setting.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Privacy Policy</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Terms of Service</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Help & Support</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">FitVibe v1.0.0</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}