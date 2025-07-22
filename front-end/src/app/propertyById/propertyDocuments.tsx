"use client";

import React from "react";
import { FileText } from "lucide-react";

interface DocumentsSectionProps {
  documents: string[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Required Documents</h2>

      {documents.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              title={doc}
            >
              <FileText className="text-blue-600 w-4 h-4 shrink-0" />
              <span className="truncate max-w-[150px]">{doc}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No documents specified for this property.</p>
      )}
    </div>
  );
};

export default DocumentsSection;
