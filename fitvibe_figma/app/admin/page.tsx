
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    totalUsers: 10234,
    totalTrainers: 456,
    totalVendors: 123,
    totalOrders: 5678,
    revenue: 2456789,
    pendingApprovals: 23
  });

  const [recentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joinDate: '2024-01-20', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'trainer', joinDate: '2024-01-19', status: 'pending' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'vendor', joinDate: '2024-01-18', status: 'active' }
  ]);

  const [pendingTrainers] = useState([
    { id: 1, name: 'Alex Rodriguez', specialty: 'Personal Training', experience: '5 years', submitDate: '2024-01-20' },
    { id: 2, name: 'Emma Thompson', specialty: 'Yoga', experience: '3 years', submitDate: '2024-01-19' },
    { id: 3, name: 'David Wilson', specialty: 'Nutrition', experience: '7 years', submitDate: '2024-01-18' }
  ]);

  const approveTrainer = (id) => {
    // Handle trainer approval logic
    console.log('Approving trainer:', id);
  };

  const rejectTrainer = (id) => {
    // Handle trainer rejection logic
    console.log('Rejecting trainer:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mr-8">
                Fitvibe Admin
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/cms"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap text-sm"
              >
                CMS Panel
              </Link>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-notification-line text-xl text-gray-600"></i>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4 lg:space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
              { id: 'users', name: 'Users', icon: 'ri-user-line' },
              { id: 'trainers', name: 'Trainers', icon: 'ri-user-star-line' },
              { id: 'vendors', name: 'Vendors', icon: 'ri-store-line' },
              { id: 'orders', name: 'Orders', icon: 'ri-shopping-bag-line' },
              { id: 'payments', name: 'Payments', icon: 'ri-money-dollar-circle-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-100 to-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 lg:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-lg lg:text-2xl text-blue-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-lg lg:text-2xl text-green-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">{stats.totalTrainers}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Trainers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-store-line text-lg lg:text-2xl text-purple-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">{stats.totalVendors}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Vendors</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-shopping-bag-line text-lg lg:text-2xl text-yellow-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Orders</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-lg lg:text-2xl text-green-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">₹{(stats.revenue / 100000).toFixed(1)}L</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Revenue</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-lg lg:text-2xl text-red-600"></i>
                  </div>
                  <div className="ml-3 lg:ml-4">
                    <h3 className="text-lg lg:text-2xl font-bold text-gray-900">{stats.pendingApprovals}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Recent Users</h2>
                <div className="space-y-3 lg:space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm lg:text-base">{user.name}</h3>
                        <p className="text-xs lg:text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.role} • {user.joinDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Pending Trainer Approvals</h2>
                <div className="space-y-3 lg:space-y-4">
                  {pendingTrainers.map((trainer) => (
                    <div key={trainer.id} className="p-3 lg:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm lg:text-base">{trainer.name}</h3>
                          <p className="text-xs lg:text-sm text-gray-600">{trainer.specialty} • {trainer.experience}</p>
                          <p className="text-xs text-gray-500">Applied: {trainer.submitDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => approveTrainer(trainer.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs lg:text-sm hover:bg-green-700 whitespace-nowrap"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectTrainer(trainer.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs lg:text-sm hover:bg-red-700 whitespace-nowrap"
                        >
                          Reject
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs lg:text-sm hover:bg-gray-50 whitespace-nowrap">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">User Management</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-auto"
                />
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 text-sm whitespace-nowrap">
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 capitalize">{user.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs would be similar structured content */}
        {activeTab !== 'overview' && activeTab !== 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h2>
            <p className="text-gray-600">
              {activeTab} management interface will be implemented here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
