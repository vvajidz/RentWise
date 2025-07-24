"use client";

import TenantProfileCard from "@/components/tenants/profile/tenantDetails";
import CurrentPropertyCard from "@/components/tenants/profile/tenantCurrentProperty";
import DocumentsCard from "@/components/tenants/profile/tenantDocument";
import useAOS from "@/hooks/aox";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Homenavbar from "@/components/common/navbar";

export default function TenantDetailsPage() {
  useAOS();

  return (
    <>
      {/* Navbar */}
      <Homenavbar/>

      {/* Page Content */}
      <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 py-6 pt-24 relative">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Tenant Profile</h1>
            <p className="text-gray-600 text-sm">
              View and manage tenant details, rental documents and current lease info.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3" data-aos="fade-right">
              <TenantProfileCard />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6 space-y-6">
              <div data-aos="fade-up">
                <DocumentsCard />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3" data-aos="fade-left">
              <CurrentPropertyCard />
            </div>
          </div>
        </div>

        {/* Floating Edit Button - Position changes based on screen size */}
        <Link
          href="/tenantProfile/edit"
          className="fixed bottom-6 right-6 md:left-auto md:right-8 z-50 bg-blue-900 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-200"
        >
          <Pencil className="w-6 h-6" />
        </Link>
      </div>
    </>
  );
}
