"use client";

import React from "react";

interface AmenitiesSectionProps {
  amenities?: string[];
  guidelines?: string[];
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities = [],
  guidelines = [],
}) => {
  const hasContent = amenities.length > 0 || guidelines.length > 0;

  if (!hasContent) return null;

  return (
    <div
      className="bg-white p-6 rounded-2xl border shadow-sm"
      data-aos="fade-up"
      data-aos-delay="150"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
        Amenities & Guidelines
      </h2>

      {amenities.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {amenities.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full shadow-sm"
                data-aos="zoom-in"
                data-aos-delay={`${100 + idx * 50}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {guidelines.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">House Guidelines</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
            {guidelines.map((rule, idx) => (
              <li key={idx} data-aos="fade-right" data-aos-delay={`${100 + idx * 50}`}>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
