"use client";

import { Star, User } from "lucide-react";
import { Philosopher } from "next/font/google";
import useAOS from "../../hooks/aox"; // ✅ Use custom hook

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ratingsData = [
  { stars: 5, count: 1200 },
  { stars: 4, count: 800 },
  { stars: 3, count: 120 },
  { stars: 2, count: 40 },
  { stars: 1, count: 20 },
];

export default function ReviewsSection() {
  useAOS(); // 💥 use the hook

  const totalRatings = ratingsData.reduce((acc, item) => acc + item.count, 0);
  const averageRating = (
    ratingsData.reduce((acc, item) => acc + item.stars * item.count, 0) / totalRatings
  ).toFixed(1);

  return (
    <section
      id="reviews"
      className={`bg-[#fdfcf9] py-20 px-6 ${philosopher.className}`}
    >
      <h2
        className="text-3xl md:text-5xl font-bold text-[#1f2937] text-center mb-6"
        data-aos="fade-up"
      >
        Customer Ratings & Reviews
      </h2>

      <div
        className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 shadow p-8 flex flex-col md:flex-row gap-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Rating Bars */}
        <div className="flex-1 space-y-3">
          {ratingsData.map((rating, index) => (
            <div
              key={rating.stars}
              className="flex items-center gap-2"
              data-aos="fade-right"
              data-aos-delay={300 + index * 100}
            >
              <div className="flex items-center gap-1 text-[#facc15]">
                <Star size={16} fill="#facc15" />
                <span className="text-gray-700 text-sm">{rating.stars}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#facc15] h-2 rounded-full"
                  style={{
                    width: `${(rating.count / totalRatings) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-gray-500 text-xs w-10 text-right">{rating.count}</span>
            </div>
          ))}
        </div>

        {/* Overall Ratings */}
        <div
          className="flex-1 flex flex-col justify-center items-center space-y-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <p className="text-5xl font-bold text-[#1f2937]">{averageRating}</p>
          <div className="flex text-[#facc15]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(parseFloat(averageRating)) ? "#facc15" : "none"}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">{totalRatings} total ratings</p>

          <div className="flex gap-2 mt-4">
            <button className="bg-[#1f2937] text-white px-4 py-2 rounded-full text-sm hover:bg-[#111827] transition">
              Write a Review
            </button>
            <button className="border border-[#1f2937] text-[#1f2937] px-4 py-2 rounded-full text-sm hover:bg-[#1f2937] hover:text-white transition">
              See All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Featured review */}
      <div
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-6 mt-10 text-left"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 rounded-full p-1">
            <User size={20} className="text-[#1f2937]" />
          </div>
          <span className="text-sm font-medium text-[#1f2937]">@john.doe</span>
          <span className="text-gray-400 text-xs">Nov 01, 2023</span>
        </div>
        <div className="flex text-[#facc15] mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="#facc15" />
          ))}
        </div>
        <p className="text-gray-700 text-sm">
          "I recently had the opportunity to explore RentWise, and it left a lasting impression. The platform seamlessly blends luxury vibes with user-friendly features, making it the go-to for premium rental experiences."
        </p>
      </div>
    </section>
  );
}
