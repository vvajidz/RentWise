"use client"

import React from 'react';
import { Plus } from 'lucide-react';
import { useUserStore } from "@/store/zustand/zustand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OwnerHeader: React.FC = () => {
  const { user } = useUserStore();

  const ownerName = user?.fullName || "owner";

  const handleAddProperty = () => {
    console.log('Add new property clicked');
  };

  return (
    <div className="relative bg-gradient-to-br from-[#060616] to-[#020d86] rounded-b-3xl overflow-hidden pb-25">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#F4EBD0] to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-[#F4EBD0] to-transparent rounded-full translate-x-40 translate-y-40"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(244,235,208,0.1) 1px, transparent 1px),
                            linear-gradient(rgba(244,235,208,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

      {/* Header content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* Left section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border border-[#F4EBD0]/40 shadow-md">
                <AvatarImage src={user?.profilePicture || undefined} />
                <AvatarFallback>{ownerName[0]}</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                  Welcome back,{' '}
                  <span className="font-semibold bg-gradient-to-r from-[#F4EBD0] to-[#E6D7A0] bg-clip-text text-transparent">
                    {ownerName}
                  </span>
                </h1>

                <p className="text-lg text-gray-300 font-light max-w-md mt-1">
                  Manage your premium properties with ease and insight.
                </p>
              </div>
            </div>
          </div>

          {/* Add Property CTA */}
          <div className="flex-shrink-0">
            <button
              onClick={handleAddProperty}
              className="group relative bg-gradient-to-r from-[#F4EBD0] to-[#E6D7A0] hover:from-[#E6D7A0] hover:to-[#F4EBD0] text-[#1C1E53] font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-[#F4EBD0]/20"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                <span className="text-base tracking-wide">Add New Property</span>
              </div>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 text-gray-300 text-sm">
          <div className="flex flex-col">
            <span className="text-lg text-[#F4EBD0] font-semibold">12</span>
            <span>Total Properties</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-[#F4EBD0] font-semibold">7</span>
            <span>Active Leases</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-[#F4EBD0] font-semibold">₹1,20,000</span>
            <span>This Month’s Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHeader;
