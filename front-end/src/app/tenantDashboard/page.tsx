"use client"

import React, { useState } from 'react';
import { 
  Bell, 
  Home, 
  CreditCard, 
  Wrench, 
  MessageCircle, 
  Download, 
  Star, 
  Calendar, 
  FileText, 
  Heart, 
  HelpCircle, 
  Sun, 
  Moon,
  ChevronRight,
  Check,
  Clock,
  AlertCircle,
  MapPin,
  User,
  Settings,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

export default function TenantDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const currentRental = {
    propertyName: "Skyline Luxury Apartments",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
    status: "Active",
    rentDue: "₹45,000",
    leaseStart: "Jan 15, 2024",
    leaseEnd: "Jan 14, 2025",
    location: "Bandra West, Mumbai"
  };

  const paymentHistory = [
    { month: "Dec 2024", amount: "₹45,000", datePaid: "Dec 1, 2024", status: "Paid" },
    { month: "Nov 2024", amount: "₹45,000", datePaid: "Nov 1, 2024", status: "Paid" },
    { month: "Oct 2024", amount: "₹45,000", datePaid: "Oct 2, 2024", status: "Paid" },
    { month: "Sep 2024", amount: "₹45,000", datePaid: "Sep 1, 2024", status: "Paid" }
  ];

  const maintenanceRequests = [
    { title: "AC not cooling properly", status: "In Progress", date: "Dec 20, 2024" },
    { title: "Kitchen faucet leak", status: "Resolved", date: "Dec 15, 2024" },
    { title: "Bathroom door handle", status: "Open", date: "Dec 22, 2024" }
  ];

  const savedProperties = [
    { name: "Ocean View Villa", location: "Juhu", price: "₹55,000/mo", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop" },
    { name: "Modern Studio", location: "Powai", price: "₹35,000/mo", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop" },
    { name: "Penthouse Suite", location: "Lower Parel", price: "₹75,000/mo", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Expiring': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Paid': return 'bg-blue-50 text-blue-700';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-slate-100 text-slate-700';
      case 'Open': return 'bg-blue-200 text-blue-900';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const quickActions = [
    { icon: CreditCard, label: "Pay Rent", primary: true },
    { icon: Wrench, label: "Request Maintenance", primary: false },
    { icon: MessageCircle, label: "Contact Manager", primary: false },
    { icon: Download, label: "Download Documents", primary: false },
    { icon: Star, label: "Give Review", primary: false }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="VAJID"
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500 ring-offset-2"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Welcome back, VAJID! 🔥
                </h1>
                <div className={`flex items-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentRental.location}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <button className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Current Rental Overview */}
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-xl border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-8 mb-8 overflow-hidden relative`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Current Rental 🏡
                </h2>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(currentRental.status)}`}>
                  {currentRental.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentRental.propertyName}
                  </h3>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                    Lease: {currentRental.leaseStart} - {currentRental.leaseEnd}
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <span>View Lease Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Rent Due</p>
                  <p className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentRental.rentDue}
                  </p>
                  <div className="flex items-center justify-end space-x-2">
                    <Calendar className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Due Jan 1, 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <img
                src={currentRental.image}
                alt={currentRental.propertyName}
                className="w-full h-48 lg:h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Quick Actions ⚡
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.primary 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg' 
                  : darkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md'
                } p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <action.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-sm">{action.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rent Payment History */}
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Payment History 💳
              </h3>
              <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} hover:bg-opacity-80 transition-colors`}>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{payment.month}</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{payment.datePaid}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Maintenance 🔧
              </h3>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                New Request
              </button>
            </div>
            
            <div className="space-y-4">
              {maintenanceRequests.map((request, index) => (
                <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} hover:bg-opacity-80 transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{request.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{request.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Document Center */}
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Documents 📄
            </h3>
            <div className="space-y-3">
              {['Lease Agreement', 'KYC Documents', 'Rent Receipts', 'Insurance Papers'].map((doc, index) => (
                <button key={index} className={`w-full flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} transition-colors`}>
                  <div className="flex items-center space-x-3">
                    <FileText className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{doc}</span>
                  </div>
                  <Download className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Personalized Insights */}
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Your Journey ✨
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border ${darkMode ? 'border-blue-500/20' : 'border-blue-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Premium Member</span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>8 months with RentWise</p>
              </div>
              
              <div className={`p-4 rounded-xl bg-gradient-to-r from-slate-500/10 to-slate-600/10 border ${darkMode ? 'border-slate-500/20' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-slate-600" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>₹5,000 Saved</span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Early payment rewards</p>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Need Help? 🤝
            </h3>
            <div className="space-y-3">
              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} transition-colors`}>
                <HelpCircle className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>FAQ</span>
              </button>
              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} transition-colors`}>
                <MessageCircle className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Live Chat</span>
              </button>
              <button className={`w-full flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'} transition-colors`}>
                <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Emergency</span>
              </button>
            </div>
          </div>
        </div>

        {/* Saved Properties */}
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Saved Properties 💖
            </h3>
            <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
              Explore Similar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.map((property, index) => (
              <div key={index} className={`rounded-xl overflow-hidden ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} hover:shadow-lg transition-all duration-300 hover:scale-105 group`}>
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-blue-500 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{property.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>{property.location}</p>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{property.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}