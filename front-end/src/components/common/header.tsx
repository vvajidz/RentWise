"use client";

import Link from "next/link";
import Homenavbar from "./navbar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import FloatingIcons from "../../animations/floatings";
import useAOS from "../../hooks/aox"; // 💥 Import your hook here


export default function RentWiseHeader() {
  useAOS(); // 💥 Call it once

  return (
    <div className="relative bg-[#fdfcf9] overflow-hidden">
  
      <FloatingIcons />

      <section
        className="relative flex flex-col items-center text-center px-4 pt-24 pb-16"
      >
        <h1
          className="text-4xl md:text-6xl font-bold text-[#1f2937] mb-3"
          data-aos="fade-down"
        >
          Rent Smarter. Live Better.
        </h1>
        <p
          className="text-gray-600 text-lg md:text-xl mb-6 max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover premium rental properties and manage them effortlessly with RentWise. Trust the vibes, live your best life.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <Link href="/properties">
            <Button className="px-8 py-3 bg-[#1f2937] text-white hover:bg-[#111827] text-lg font-semibold rounded-full transition">
              Explore Properties
            </Button>
          </Link>
          <Link href="/#how-it-works">
            <Button className="px-8 py-3 border border-[#1f2937] text-[#aeb692] hover:bg-[#1f2937] hover:text-white text-lg font-semibold rounded-full transition">
              How It Works
            </Button>
          </Link>
        </div>

        <div
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl mb-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <img
            src="https://i.pinimg.com/1200x/ed/fb/4f/edfb4fbeacf09381d29bae140e849da0.jpg"
            alt="Premium Property"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-6 py-4 flex justify-between items-center">
            <div className="text-left">
              <p className="text-xs uppercase tracking-wider">Luxury</p>
              <p className="text-sm md:text-lg font-medium">Elite living spaces, curated for you</p>
            </div>
            <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
              <Home className="text-black w-5 h-5" />
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex flex-col items-center shadow-sm">
            <p className="text-2xl font-bold text-[#1f2937]">500+</p>
            <p className="text-gray-500 text-sm">Luxury Units</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex flex-col items-center shadow-sm">
            <p className="text-2xl font-bold text-[#1f2937]">20K</p>
            <p className="text-gray-500 text-sm">Happy Tenants</p>
          </div>
          <div className="bg-[#1f2937] text-white rounded-xl px-6 py-5 flex flex-col items-center shadow-sm">
            <p className="text-2xl font-bold">99%</p>
            <p className="text-gray-300 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}
