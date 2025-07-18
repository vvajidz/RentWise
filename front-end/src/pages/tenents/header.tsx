"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, MapPinIcon, SlidersIcon, StarIcon } from "lucide-react";
import { Philosopher } from "next/font/google";
import { useUserStore } from "@/store/zustand";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
};

const philosopher = Philosopher({ subsets: ["latin"], weight: ["400", "700"] });

const properties: Property[] = [
  {
    id: "1",
    title: "Ocean Breeze Villa",
    location: "Beach Ave, Anycity",
    price: 910000,
    rating: 4.9,
    image: "https://i.pinimg.com/736x/1a/4a/3e/1a4a3ea6aa9e8ea0e7a746238a5575c0.jpg",
  },
  {
    id: "2",
    title: "Jakson House",
    location: "Oak Avenue, New York",
    price: 750000,
    rating: 4.8,
    image: "https://i.pinimg.com/736x/24/eb/5d/24eb5dcaf4ff46d100ee460b7ea101f6.jpg",
  },
  {
    id: "3",
    title: "Lakeside Cottage",
    location: "Maple Lane, LA",
    price: 540000,
    rating: 4.7,
    image: "https://i.pinimg.com/1200x/a9/1e/59/a91e5933909e0da5f8469797625ef02a.jpg",
  },
  {
    id: "4",
    title: "Skyline Penthouse",
    location: "Downtown, Chicago",
    price: 1200000,
    rating: 4.95,
    image: "https://i.pinimg.com/1200x/b4/f3/85/b4f385044f0f4d51e496ee6f706c538e.jpg",
  },
];

export default function RentWiseTenents() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const { user } = useUserStore();

  return (
    <div className="px-4 py-6 pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div
          className="mb-10 text-center max-w-3xl mx-auto"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h1
            className={`${philosopher.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4`}
          >
            Find Your New Home,{" "}
            <span className="bg-gradient-to-r from-blue-950 via-gray-500 to-yellow-700 bg-clip-text text-transparent">
              {user?.fullName.split(" ")[1]}
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Discover premium listings, luxury vibes, and your next dream space — all in one place.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="flex gap-2 bg-white p-2 rounded-lg shadow-sm mb-8 border"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center flex-1">
            <MapPinIcon className="w-4 h-4 text-gray-400 ml-2" />
            <Input
              placeholder="City or Street"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none focus-visible:ring-0 bg-transparent text-sm py-1 h-8"
            />
          </div>

          <div className="flex items-center flex-1 border-l pl-2">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Move-in Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-none focus-visible:ring-0 bg-transparent text-sm py-1 h-8"
            />
          </div>

          <Button variant="ghost" size="sm" className="text-gray-500">
            <SlidersIcon className="w-4 h-4 mr-1" /> Filters
          </Button>

          <Button size="sm" className="px-3">
            Search
          </Button>
        </div>

        {/* Section Heading */}
        <div
          className="mb-5"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="font-medium text-gray-700">Most Viewed</h2>
          <p className="text-gray-500 text-xs mt-1">
            Popular listings selected for you
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              aosDelay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({
  property,
  aosDelay = 0,
}: {
  property: Property;
  aosDelay?: number;
}) {
  return (
    <div
      className="overflow-hidden rounded-3xl hover:scale-[1.02] transition-transform"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-delay={aosDelay}
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-3xl"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          €{property.price.toLocaleString().slice(0, -3)}K
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-4 bg-neutral-900 rounded-3xl mt-[-1rem]">
        <h3 className="font-bold text-lg mb-1 text-white">{property.title}</h3>
        <p className="text-sm text-gray-300 mb-2 flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1" /> {property.location}
        </p>

        <div className="flex items-center text-yellow-400 mb-3">
          <StarIcon className="w-4 h-4 fill-yellow-400 mr-1" />
          <span className="text-sm font-medium">{property.rating}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
            Luxury Stay
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
            2 Day Stay
          </span>
        </div>

        <Button
          variant="default"
          className="w-full bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}
