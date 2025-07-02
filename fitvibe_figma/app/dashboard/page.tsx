
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    isPaid: true,
    joinDate: '2024-01-15'
  });

  const [stats, setStats] = useState({
    totalOrders: 12,
    activeBookings: 3,
    completedSessions: 25,
    favoriteTrainers: 5
  });

  const [recentOrders] = useState([
    { id: 1, product: 'Premium Whey Protein', amount: 2499, status: 'Delivered', date: '2024-01-20' },
    { id: 2, product: 'Resistance Bands Set', amount: 899, status: 'Shipped', date: '2024-01-18' },
    { id: 3, product: 'Yoga Mat Premium', amount: 1299, status: 'Processing', date: '2024-01-16' }
  ]);

  const [upcomingSessions] = useState([
    { id: 1, trainer: 'Sarah Johnson', type: 'Personal Training', date: '2024-01-25', time: '10:00 AM' },
    { id: 2, trainer: 'Mike Chen', type: 'Nutrition Consultation', date: '2024-01-26', time: '2:00 PM' },
    { id: 3, trainer: 'Lisa Rodriguez', type: 'Yoga Session', date: '2024-01-27', time: '6:00 PM' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's your fitness journey overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-bag-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                <p className="text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-2xl text-green-600"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeBookings}</h3>
                <p className="text-gray-600">Active Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-trophy-line text-2xl text-purple-600"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.completedSessions}</h3>
                <p className="text-gray-600">Sessions Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-heart-line text-2xl text-yellow-600"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.favoriteTrainers}</h3>
                <p className="text-gray-600">Favorite Trainers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
              <Link href="/bookings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{session.type}</h3>
                    <p className="text-sm text-gray-600">with {session.trainer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/products" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-shopping-cart-line text-2xl text-blue-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Shop Products</span>
            </Link>

            <Link href="/trainers" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-user-star-line text-2xl text-green-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Find Trainers</span>
            </Link>

            <Link href="/services" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-calendar-line text-2xl text-purple-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Book Services</span>
            </Link>

            <Link href="/profile" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-user-settings-line text-2xl text-yellow-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Profile Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
