
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CMSPanel() {
  const [activeSection, setActiveSection] = useState('content');
  const [contentData, setContentData] = useState({
    homepage: {
      heroTitle: 'Transform Your Life with Fitvibe',
      heroSubtitle: 'Connect with certified trainers, expert consultants, and premium fitness products. Your complete wellness ecosystem in one platform.',
      aboutTitle: 'About Fitvibe',
      aboutDescription: 'Fitvibe is your comprehensive fitness and wellness platform...'
    },
    products: [
      { id: 1, name: 'Premium Whey Protein', price: '₹2,499', category: 'Protein Supplements', status: 'active' },
      { id: 2, name: 'Smart Fitness Tracker', price: '₹4,999', category: 'Wearable Tech', status: 'active' },
      { id: 3, name: 'Resistance Bands Set', price: '₹899', category: 'Fitness Equipment', status: 'active' }
    ],
    trainers: [
      { id: 1, name: 'Sarah Johnson', specialty: 'Personal Training', status: 'approved', rating: 4.9 },
      { id: 2, name: 'Mike Chen', specialty: 'Strength Training', status: 'approved', rating: 4.8 },
      { id: 3, name: 'Lisa Rodriguez', specialty: 'Yoga', status: 'pending', rating: 4.9 }
    ],
    consultants: [
      { id: 1, name: 'Dr. Arjun Patel', specialty: 'Sports Nutrition', status: 'approved', rating: 4.9 },
      { id: 2, name: 'Dr. Priya Sharma', specialty: 'Weight Management', status: 'approved', rating: 4.8 },
      { id: 3, name: 'Dr. Rohit Kumar', specialty: 'Sports Medicine', status: 'pending', rating: 4.7 }
    ]
  });

  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (type, item) => {
    setEditingItem({ type, id: item.id });
    setEditForm(item);
  };

  const handleSave = () => {
    if (editingItem) {
      const { type, id } = editingItem;
      setContentData(prev => ({
        ...prev,
        [type]: prev[type].map(item => 
          item.id === id ? { ...item, ...editForm } : item
        )
      }));
      setEditingItem(null);
      setEditForm({});
    }
  };

  const handleDelete = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setContentData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
    }
  };

  const handleStatusChange = (type, id, newStatus) => {
    setContentData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CMS Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mr-8">
                Fitvibe CMS
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-xl"></i>
                </div>
              </Link>
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
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'content', name: 'Page Content', icon: 'ri-file-text-line' },
              { id: 'products', name: 'Products', icon: 'ri-shopping-cart-line' },
              { id: 'trainers', name: 'Trainers', icon: 'ri-user-star-line' },
              { id: 'consultants', name: 'Consultants', icon: 'ri-heart-pulse-line' },
              { id: 'media', name: 'Media Library', icon: 'ri-image-line' },
              { id: 'settings', name: 'Site Settings', icon: 'ri-settings-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === tab.id
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

        {/* Page Content Section */}
        {activeSection === 'content' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Homepage Content</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={contentData.homepage.heroTitle}
                    onChange={(e) => setContentData(prev => ({
                      ...prev,
                      homepage: { ...prev.homepage, heroTitle: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={contentData.homepage.heroSubtitle}
                    onChange={(e) => setContentData(prev => ({
                      ...prev,
                      homepage: { ...prev.homepage, heroSubtitle: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Section Title</label>
                  <input
                    type="text"
                    value={contentData.homepage.aboutTitle}
                    onChange={(e) => setContentData(prev => ({
                      ...prev,
                      homepage: { ...prev.homepage, aboutTitle: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Description</label>
                  <textarea
                    rows={4}
                    value={contentData.homepage.aboutDescription}
                    onChange={(e) => setContentData(prev => ({
                      ...prev,
                      homepage: { ...prev.homepage, aboutDescription: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeSection === 'products' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap">
                Add New Product
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contentData.products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={product.status}
                          onChange={(e) => handleStatusChange('products', product.id, e.target.value)}
                          className={`text-sm rounded-full px-3 py-1 ${
                            product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEdit('products', product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('products', product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Trainers Management */}
        {activeSection === 'trainers' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Trainers Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap">
                Add New Trainer
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trainer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contentData.trainers.map((trainer) => (
                    <tr key={trainer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trainer.specialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span className="text-sm">{trainer.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={trainer.status}
                          onChange={(e) => handleStatusChange('trainers', trainer.id, e.target.value)}
                          className={`text-sm rounded-full px-3 py-1 ${
                            trainer.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            trainer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEdit('trainers', trainer)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('trainers', trainer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consultants Management */}
        {activeSection === 'consultants' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Consultants Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all whitespace-nowrap">
                Add New Consultant
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Consultant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contentData.consultants.map((consultant) => (
                    <tr key={consultant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{consultant.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{consultant.specialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span className="text-sm">{consultant.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={consultant.status}
                          onChange={(e) => handleStatusChange('consultants', consultant.id, e.target.value)}
                          className={`text-sm rounded-full px-3 py-1 ${
                            consultant.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            consultant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEdit('consultants', consultant)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('consultants', consultant.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other sections placeholder */}
        {(activeSection === 'media' || activeSection === 'settings') && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeSection === 'media' ? 'Media Library' : 'Site Settings'}
            </h2>
            <p className="text-gray-600">
              {activeSection === 'media' ? 'Media management interface' : 'Site configuration options'} will be implemented here.
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Edit {editingItem.type.slice(0, -1).charAt(0).toUpperCase() + editingItem.type.slice(1, -1)}
              </h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {editingItem.type === 'products' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="text"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
              
              {(editingItem.type === 'trainers' || editingItem.type === 'consultants') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input
                    type="text"
                    value={editForm.specialty || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
