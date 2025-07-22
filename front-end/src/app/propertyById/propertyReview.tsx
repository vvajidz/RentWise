"use client";

import React from "react";
import { StarIcon, MessageCircle } from "lucide-react";

interface Review {
  user: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
  date?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <MessageCircle className="text-yellow-500 w-5 h-5" />
        Tenant Reviews
      </h2>

      {reviews && reviews.length > 0 ? (
        <>
          <p className="text-gray-800 text-lg font-medium mb-4">
            ⭐ {averageRating} · {reviews.length} reviews
          </p>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={review.user}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    )}
                    <span className="font-medium text-gray-800">{review.user}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-yellow-400" : "stroke-yellow-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                {review.date && (
                  <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm">No reviews yet for this property.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
