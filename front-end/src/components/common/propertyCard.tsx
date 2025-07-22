"use client";

import { Button } from "@/components/ui/button";
import { MapPinIcon, BuildingIcon, Clock4Icon, ShieldCheckIcon, FlameIcon, PawPrintIcon } from "lucide-react";
import Link from "next/link";

export type PropertyCardProps = {
  property: {
    _id: string;
    propertyName: string;
    address: string;
    monthlyRent: number;
    image: string;
    rating?: number;
    propertyType: string;
    leaseTerms: number;
    isVerified?: boolean;
    isPetFriendly?: boolean;
    isTrending?: boolean;
  };
  aosDelay?: number;
};

export default function PropertyCard({
  property,
  aosDelay = 0,
}: PropertyCardProps) {
  const {
    _id,
    propertyName,
    address,
    monthlyRent,
    image,
    propertyType,
    leaseTerms,
    isVerified,
    isPetFriendly,
    isTrending,
  } = property;

  return (
    <Link
      href={`/propertyById/${_id}`}
      className="overflow-hidden rounded-3xl hover:scale-[1.02] transition-transform shadow-lg max-w-sm"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-delay={aosDelay}
    >
      <div className="relative">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-52 object-cover rounded-t-3xl"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          ₹{monthlyRent ? monthlyRent.toLocaleString() : "N/A"}
        </div>
        <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-5 bg-white rounded-b-3xl">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
          {propertyName}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1" /> {address}
        </p>

        <div className="flex gap-2 flex-wrap mb-3">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center">
            <BuildingIcon className="w-3 h-3 mr-1" /> {propertyType}
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center">
            <Clock4Icon className="w-3 h-3 mr-1" /> {leaseTerms} Month Lease
          </span>
          {isVerified && (
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs flex items-center">
              <ShieldCheckIcon className="w-3 h-3 mr-1" /> Verified
            </span>
          )}
          {isTrending && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs flex items-center">
              <FlameIcon className="w-3 h-3 mr-1" /> Popular
            </span>
          )}
          {isPetFriendly && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center">
              <PawPrintIcon className="w-3 h-3 mr-1" /> Pet-Friendly
            </span>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full font-medium"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
}
