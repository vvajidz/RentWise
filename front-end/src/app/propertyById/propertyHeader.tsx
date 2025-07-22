"use client";

import React from "react";
import { MapPin, Home, CalendarDays } from "lucide-react";
import Link from "next/link";

interface PropertyHeaderProps {
  property?: {
    propertyName: string;
    address: string;
    propertyType: string;
    availableFrom?: string;
  };
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  if (!property) return null;

  const { propertyName, address, propertyType, availableFrom } = property;

  return (
    <div className="space-y-4" data-aos="fade-up">
      <h1 className="text-3xl font-bold text-charcoal tracking-tight">
        {propertyName}
      </h1>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={16} className="text-gold" />
        <span>{address}</span>
      </div>

      <div className="flex items-center gap-4 flex-wrap text-sm">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold font-medium">
          <Home size={16} />
          {propertyType}
        </span>

        {availableFrom && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-charcoal/10 text-charcoal font-medium">
            <CalendarDays size={16} />
            Available from {new Date(availableFrom).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyHeader;
