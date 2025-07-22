"use client";

import React from "react";
import {
  BedDouble,
  Bath,
  Ruler,
  Sofa,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";

interface OverviewSectionProps {
  property: {
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    furnished?: boolean;
    availableFrom?: string;
    minimumStay?: number;
    leaseTerms?: number;
  };
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ property }) => {
  const overviewItems = [
    {
      label: "Bedrooms",
      value: property.bedrooms?.toString(),
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: property.bathrooms?.toString(),
      icon: Bath,
    },
    {
      label: "Area",
      value: property.squareFeet ? `${property.squareFeet} sq ft` : undefined,
      icon: Ruler,
    },
    {
      label: "Furnished",
      value:
        typeof property.furnished === "boolean"
          ? property.furnished
            ? "Yes"
            : "No"
          : undefined,
      icon: Sofa,
    },
    {
      label: "Available From",
      value: property.availableFrom
        ? new Date(property.availableFrom).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : undefined,
      icon: Calendar,
    },
    {
      label: "Min Stay",
      value: property.minimumStay ? `min stay ${property.minimumStay} m` : undefined,
      icon: Clock,
    },
    {
      label: "Lease",
      value: property.leaseTerms ? `lease term ${property.leaseTerms} m` : undefined,
      icon: FileText,
    },
  ].filter((item) => item.value); // ✅ Filter out undefined/null/empty values

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-md" data-aos="fade-up">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Overview</h2>
      <div className="flex flex-wrap gap-3">
        {overviewItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 text-sm text-gray-700 hover:bg-gray-200 transition-all"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewSection;
