"use client";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export default function CurrentPropertyCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Current Property</h3>
      
      {/* Property Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <Image
          src="https://i.pinimg.com/736x/41/23/7e/41237e9dc8b5abdf721f3839af5f8bc2.jpg"
          alt="Current Property"
          fill
          className="object-cover"
        />
        
        {/* Premium Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Premium
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            Hillside Retreat
          </h4>
          
          <div className="flex items-center space-x-1 text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">123 Sunset Blvd, LA</span>
          </div>
        </div>

        {/* Rent */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
          <div className="text-sm text-green-700 font-medium">Monthly Rent</div>
          <div className="text-2xl font-bold text-green-800">₹45,000</div>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">3</div>
            <div className="text-gray-600">Bedrooms</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">2</div>
            <div className="text-gray-600">Bathrooms</div>
          </div>
        </div>
      </div>
    </div>
  );
}