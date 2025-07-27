"use client";

import { MessageSquare, Star, Calendar, User } from "lucide-react";
import React from "react";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewer: string;
};

type Note = {
  note: string;
  date: string;
  type: "maintenance" | "important" | "general";
};

export default function ReviewsNotesCard() {
  const reviews: Review[] = [
    {
      rating: 5,
      comment:
        "Excellent tenant! Always pays rent on time and maintains the property very well.",
      date: "Dec 10, 2024",
      reviewer: "Property Manager",
    },
    {
      rating: 4,
      comment: "Good communication and responsive to maintenance requests.",
      date: "Nov 15, 2024",
      reviewer: "Landlord",
    },
  ];

  const notes: Note[] = [
    {
      note: "Requested maintenance for kitchen faucet - completed Dec 20",
      date: "Dec 20, 2024",
      type: "maintenance",
    },
    {
      note: "Lease renewal discussion scheduled for February",
      date: "Dec 15, 2024",
      type: "important",
    },
    {
      note: "Preferred contact method: Email",
      date: "Dec 1, 2024",
      type: "general",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getNoteTypeColor = (type: Note["type"]) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      case "important":
        return "bg-red-100 text-red-800";
      case "general":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Reviews & Notes</h3>
      </div>

      {/* Reviews */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Reviews</h4>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm font-medium text-gray-900">
                    {review.rating}/5
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{review.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <User className="w-3 h-3" />
                <span>by {review.reviewer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Internal Notes
        </h4>
        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-200 bg-blue-50 pl-4 pr-3 py-3 rounded-r-lg"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-700 flex-1">{note.note}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ml-2 ${getNoteTypeColor(
                    note.type
                  )}`}
                >
                  {note.type}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 mt-2">
                <Calendar className="w-3 h-3" />
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
