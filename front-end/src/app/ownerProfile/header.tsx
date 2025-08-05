"use client"

import React, { useEffect } from 'react'
import { House, Paperclip, Plus } from 'lucide-react'
import { useUserStore } from "@/store/zustand/zustand"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'


const OwnerHeader: React.FC = () => {
  const { user } = useUserStore()
  const router = useRouter()
  const ownerName = user?.fullName || "owner"

  const handleAddProperty = () => router.push("/addProperty")

  const stats = [
    {
      icon: <House />,
      value: "12",
      label: "Total Properties",
      color: "from-emerald-400 to-teal-600",
      pulse: "bg-emerald-400"
    },
    {
      icon: <Paperclip />,
      value: "7",
      label: "Active Leases",
      color: "from-blue-400 to-indigo-600",
      pulse: "bg-blue-400"
    },
    {
      icon: "₹",
      value: "₹1,20,000",
      label: "This Month's Revenue",
      color: "from-purple-900 to-blue-800",
      pulse: "bg-purple-400"
    }
  ]

  useEffect(() => {
    // Ensure AOS is initialized (if not already done in main component)
    if (typeof window !== 'undefined' && !window.Aos) {
      import('aos').then((AOS) => {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
        })
      })
    }
  }, [])

  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" 
          data-aos="fade-down"
          data-aos-delay="100"
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" 
          data-aos="fade-up"
          data-aos-delay="300"
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-500" 
          data-aos="fade-down"
          data-aos-delay="200"
        />
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      {/* Content container */}
      <div className="relative z-10 px-8 py-12 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main header section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
            {/* User info section */}
            <div className="flex items-center gap-6" data-aos="fade-right">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20 shadow-2xl ring-4 ring-cyan-500/20">
                  <AvatarImage src={user?.profilePicture || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-2xl font-bold">
                    {ownerName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Dashboard</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Hello, <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-100 bg-clip-text text-transparent">{ownerName}</span>
                </h1>
                <p className="text-slate-300 text-lg font-light max-w-md">
                  Your property empire awaits. Let's make today count.
                </p>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleAddProperty}
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ease-out self-start"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                <span className="text-lg tracking-wide">Add Property</span>
              </div>
            </button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{stat.icon}</span>
                  </div>
                  <div className={`w-2 h-2 ${stat.pulse} rounded-full animate-pulse`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-slate-300 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerHeader