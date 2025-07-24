"use client";

import { useState } from "react";
import SearchBar from "@/components/common/tenantSearch";
import PropertyCard from "@/components/common/propertyCard";
import { useProperties } from "./propertyFetch";
import { useUserStore } from "@/store/zustand/zustand";
import Homenavbar from "@/components/common/navbar";

export default function ExplorePage() {
  const { properties, loading } = useProperties();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const { user } = useUserStore();

  const getGreetingName = () => {
    if (!user?.fullName) return "Guest";
    const splitName = user.fullName.split(" ");
    return splitName.length > 1 ? splitName[1] : splitName[0];
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <Homenavbar />
      </header>

      <main className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
        {/* Greeting */}
        <section className="text-left mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to RentWise,{" "}
            <span className="text-yellow-600">{getGreetingName()} 👋</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Find verified, transparent homes ready for you.
          </p>
        </section>

        {/* Search */}
        <SearchBar
          location={location}
          setLocation={setLocation}
          date={date}
          setDate={setDate}
        />

        {/* Properties */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Properties</h2>
            <div className="text-sm text-gray-500">Sort by: Newest</div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {properties.map((item, index) => (
                <PropertyCard
                  key={item._id}
                  property={{
                    _id: item._id,
                    propertyName: item.propertyName,
                    address: item.address,
                    monthlyRent: item.monthlyRent,
                    image: item.images?.[0] || "/default-house.jpg",
                    propertyType: item.propertyType,
                    leaseTerms: item.leaseTerms,
                  }}
                  aosDelay={index * 100}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
