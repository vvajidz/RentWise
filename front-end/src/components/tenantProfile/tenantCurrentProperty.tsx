"use client";

import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useUserStore , User , TenantData} from "@/store/zustand/zustand";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CurrentPropertyCard() {
  const { user } = useUserStore();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user?.tenantData?.currentProperty) {
    console.warn("No current property assigned to user.");
    setLoading(false);
    return;
  }

  const fetchProperty = async () => {
    try {
      console.log("Fetching property ID:", user?.tenantData?.currentProperty);
      const res = await axios.get(`/property/${user?.tenantData?.currentProperty}`);
      console.log("Fetched property data:", res.data);
      setProperty(res.data.property); // ✅ Fix is here
    } catch (err) {
      console.error("Error fetching property:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProperty();
}, [user?.tenantData?.currentProperty]);


  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Current Property</h3>
        <p className="text-sm text-gray-500">Loading your current property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Current Property</h3>
        <p className="text-sm text-gray-500 mb-4">You don't have a current property assigned yet.</p>
       <Link href="/all-properties">
      <Button className="bg-blue-950 text-white hover:bg-blue-900">
        Explore Properties
      </Button>
    </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Current Property</h3>

      {/* Property Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <Image
          src={property.images?.[0] || "/fallback.jpg"}
          alt="Current Property"
          fill
          className="object-cover"
          unoptimized // optional: allows localhost or non-whitelisted images
        />
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
            {property.propertyName}
          </h4>
          <div className="flex items-center space-x-1 text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.address}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
          <div className="text-sm text-green-700 font-medium">Monthly Rent</div>
          <div className="text-2xl font-bold text-green-800">₹{property.monthlyRent}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">{property.bedrooms}</div>
            <div className="text-gray-600">Bedrooms</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">{property.bathrooms}</div>
            <div className="text-gray-600">Bathrooms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
