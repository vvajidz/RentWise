"use client";

import React from "react";

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <div
      className="bg-white rounded-2xl p-6 border shadow-sm"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
        Property Description
      </h2>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {description || "No description provided. Please contact the owner for more information."}
      </p>
    </div>
  );
};

export default DescriptionSection;
