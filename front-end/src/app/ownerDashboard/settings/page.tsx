'use client';

import { useState } from 'react';
import { User, Lock, Bell, CreditCard, Shield } from 'react-feather';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: <User size={16} />, label: 'Profile' },
    { id: 'password', icon: <Lock size={16} />, label: 'Password' },
    { id: 'notifications', icon: <Bell size={16} />, label: 'Notifications' },
    { id: 'billing', icon: <CreditCard size={16} />, label: 'Billing' },
    { id: 'security', icon: <Shield size={16} />, label: 'Security' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-blue-950 mb-6">Account Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left flex items-center space-x-3 p-4 transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-800' 
                    : 'hover:bg-blue-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-blue-950 mb-6">Profile Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="(555) 123-4567"
                  />
                </div>
                <div className="pt-4">
                  <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-blue-950 mb-6">Change Password</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="pt-4">
                  <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-blue-950 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-blue-950 mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span>New tenant applications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span>Rent payments received</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span>Maintenance requests</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-blue-950 mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span>Upcoming lease expirations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span>Late rent payments</span>
                    </label>
                  </div>
                </div>
                <div className="pt-2">
                  <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}