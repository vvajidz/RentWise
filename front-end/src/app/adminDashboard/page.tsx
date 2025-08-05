"use client"

import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Building, 
  TrendingUp, 
  Bell, 
  Settings, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Edit, 
  Trash2,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  UserCheck,
  Building2,
  Calendar,
  LucideIcon
} from 'lucide-react';

// Types (keep the same types as before)
type PropertyStatus = 'approved' | 'pending' | 'rejected';
type UserType = 'owners' | 'tenants';

interface Property {
  id: number;
  name: string;
  owner: string;
  location: string;
  status: PropertyStatus;
  type: string;
  rent: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  joined: string;
  properties?: number;
  currentRental?: string | null;
}

interface UsersData {
  owners: User[];
  tenants: User[];
}

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface ActivityLog {
  id: number;
  admin: string;
  action: string;
  time: string;
  date: string;
}

interface Stats {
  totalProperties: number;
  totalOwners: number;
  totalTenants: number;
  activeRentals: number;
  monthlyRevenue: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Mock data (same as before)
const mockStats: Stats = {
  totalProperties: 1247,
  totalOwners: 856,
  totalTenants: 1891,
  activeRentals: 1032,
  monthlyRevenue: 2847500
};

const mockProperties: Property[] = [
  { id: 1, name: 'Luxury Villa Marina', owner: 'John Smith', location: 'Mumbai', status: 'approved', type: 'Villa', rent: 85000 },
  { id: 2, name: 'Modern Apartment Downtown', owner: 'Sarah Johnson', location: 'Delhi', status: 'pending', type: 'Apartment', rent: 45000 },
  { id: 3, name: 'Cozy Studio Bandra', owner: 'Mike Wilson', location: 'Mumbai', status: 'approved', type: 'Studio', rent: 35000 },
  { id: 4, name: 'Family House Koramangala', owner: 'Lisa Davis', location: 'Bangalore', status: 'rejected', type: 'House', rent: 55000 }
];

const mockUsers: UsersData = {
  owners: [
    { id: 1, name: 'John Smith', email: 'john@email.com', verified: true, properties: 3, joined: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', verified: false, properties: 1, joined: '2024-02-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', verified: true, properties: 2, joined: '2024-03-10' }
  ],
  tenants: [
    { id: 1, name: 'Alice Brown', email: 'alice@email.com', verified: true, currentRental: 'Luxury Villa Marina', joined: '2024-01-20' },
    { id: 2, name: 'Bob Miller', email: 'bob@email.com', verified: true, currentRental: 'Modern Apartment Downtown', joined: '2024-02-15' },
    { id: 3, name: 'Carol Wilson', email: 'carol@email.com', verified: false, currentRental: null, joined: '2024-03-01' }
  ]
};

const mockNotifications: Notification[] = [
  { id: 1, type: 'property', message: 'New property "Seaside Villa" needs approval', time: '2 hours ago' },
  { id: 2, type: 'owner', message: 'Owner verification request from "David Kumar"', time: '5 hours ago' },
  { id: 3, type: 'property', message: 'Property report for "Downtown Loft" needs review', time: '1 day ago' }
];

const mockActivityLog: ActivityLog[] = [
  { id: 1, admin: 'Admin User', action: 'Approved property "Luxury Villa Marina"', time: '10:30 AM', date: 'Today' },
  { id: 2, admin: 'Super Admin', action: 'Rejected owner verification for "Fake Account"', time: '09:15 AM', date: 'Today' },
  { id: 3, admin: 'Admin User', action: 'Updated platform commission rate to 8%', time: '04:45 PM', date: 'Yesterday' }
];

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-blue-900">
          {title.includes('Revenue') ? `₹${(value / 100000).toFixed(1)}L` : value.toLocaleString()}
        </p>
      </div>
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    {trend && (
      <div className="mt-3 flex items-center text-sm">
        <span className={`flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className={`w-4 h-4 mr-1 ${trend > 0 ? '' : 'transform rotate-180'}`} />
          {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'} from last month
        </span>
      </div>
    )}
  </div>
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-900">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userTab, setUserTab] = useState<UserType>('owners');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Property | User | null>(null);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value={mockStats.totalProperties} icon={Building2} trend={12} />
        <StatCard title="Total Owners" value={mockStats.totalOwners} icon={UserCheck} trend={8} />
        <StatCard title="Total Tenants" value={mockStats.totalTenants} icon={Users} trend={15} />
        <StatCard title="Monthly Revenue" value={mockStats.monthlyRevenue} icon={DollarSign} trend={18} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Revenue Trends</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">Monthly</button>
              <button className="text-xs px-2 py-1 hover:bg-gray-100 rounded">Yearly</button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-gray-300" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Property Distribution</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <PieChart className="w-12 h-12 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold text-blue-900">Property Management</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search properties..." 
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-900">{property.name}</div>
                  <div className="text-xs text-gray-500">{property.type}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.owner}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{property.location}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">₹{property.rent.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    property.status === 'approved' ? 'bg-green-100 text-green-800' :
                    property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {setSelectedItem(property); setShowModal(true);}}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">Showing 1 to 4 of 4 entries</div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold text-blue-900">User Management</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Search ${userTab}...`} 
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
              <button 
                onClick={() => setUserTab('owners')}
                className={`px-3 py-1 text-sm rounded-md ${
                  userTab === 'owners' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Owners
              </button>
              <button 
                onClick={() => setUserTab('tenants')}
                className={`px-3 py-1 text-sm rounded-md ${
                  userTab === 'tenants' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tenants
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {userTab === 'owners' ? 'Properties' : 'Current Rental'}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers[userTab].map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-900">{user.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {userTab === 'owners' ? `${user.properties} properties` : (user.currentRental || 'None')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.joined}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {setSelectedItem(user); setShowModal(true);}}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">Showing 1 to 3 of 3 entries</div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Pending Approvals
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">3 new</span>
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center mb-4">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Activity Log
        </h3>
        <div className="space-y-4">
          {mockActivityLog.map((activity) => (
            <div key={activity.id} className="border-l-2 border-blue-400 pl-3 py-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">{activity.admin}</span> • {activity.time} • {activity.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Platform Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
            <input 
              type="text" 
              defaultValue="RentWise" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
            <input 
              type="number" 
              defaultValue="8" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="pt-2">
            <button className="bg-blue-900 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Admin Management</h3>
        <div className="space-y-4">
          <button className="w-full bg-blue-900 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-800 transition-colors">
            Add New Admin
          </button>
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Current Admins</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">admin@rentwise.com</p>
                  <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Super Admin</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">manager@rentwise.com</p>
                  <p className="text-xs text-gray-500">Last active: 1 day ago</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="w-6 h-6 text-white mr-3" />
              <h1 className="text-xl font-bold">RentWise Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-1.5 rounded-full hover:bg-blue-800 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </div>
                <span className="text-sm hidden sm:inline">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-6 py-2 hide-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'properties', label: 'Properties', icon: Building2 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-2 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title={selectedItem ? ('name' in selectedItem ? selectedItem.name : 'User Details') : 'Details'}
      >
        {selectedItem && (
          <div className="space-y-4">
            {'name' in selectedItem && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedItem.name}</p>
                </div>
                {'owner' in selectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedItem.owner}</p>
                  </div>
                )}
                {'location' in selectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedItem.location}</p>
                  </div>
                )}
                {'email' in selectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedItem.email}</p>
                  </div>
                )}
                {'type' in selectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedItem.type}</p>
                  </div>
                )}
                {'rent' in selectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">₹{selectedItem.rent.toLocaleString()}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;