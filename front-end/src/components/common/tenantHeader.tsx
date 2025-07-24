"use client";

import FloatingIcons from "../../animations/floatings";
import useAOS from "../../hooks/aox";
import { useProperties } from "@/app/all-properties/propertyFetch";
import PropertyCard from "@/components/common/propertyCard";
import Link from "next/link";
import { useUserStore } from "@/store/zustand/zustand";



export default function RentWiseTenants() {
  useAOS();
  const { properties, loading } = useProperties();
  const { user } = useUserStore();

  return (
    <div className="relative bg-[#fdfcf9] min-h-screen overflow-hidden pb-20">
      <FloatingIcons />

      {/* Header */}
      <section className="relative text-center px-4 pt-24 pb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Find Your New Home,{" "}
          <span className="bg-gradient-to-r from-blue-950 via-gray-700 to-blue-700 bg-clip-text text-transparent">
            {user?.fullName?.split(" ") || "Guest"}
          </span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Discover premium listings, luxury vibes, and your next dream space — all in one place.
        </p>
      </section>

      {/* Featured Properties */}
      <section className="px-4">
        <div
          className="flex justify-center gap-6 flex-wrap md:flex-nowrap"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {loading ? (
            <p className="text-gray-500">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="text-gray-400 italic">No properties available.</p>
          ) : (
            properties.slice(0, 4).map((property, index) => (
              <div
                key={property._id}
                className="w-[340px] flex-shrink-0"
              >
                <PropertyCard
                  property={{
                    _id: property._id,
                    propertyName: property.propertyName,
                    address: property.address,
                    monthlyRent: property.monthlyRent,
                    image: property.images?.[0] || "/default-house.jpg",
                    rating: 4.5,
                    propertyType: property.propertyType,
                    leaseTerms: property.leaseTerms,
                  }}
                  aosDelay={index * 100}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* View All Properties Link */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/all-properties"
          className="bg-blue-800 hover:bg-blue-950 text-white text-sm font-medium py-2 px-6 rounded-full transition duration-200"
        >
          Explore Properties
        </Link>
      </div>
    </div>
  );
}
