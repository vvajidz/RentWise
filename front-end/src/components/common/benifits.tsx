"use client";

import { UserCheck, Home, Wallet, FileText, MessageSquare } from "lucide-react";
import useAOS from "../common/aox";

export default function SupportSection() {
  useAOS(); // 💥 Call the custom hook

  return (
    <section className="bg-[#fdfcf9] py-20 px-4"
        id="support">
      <div
        className="max-w-7xl mx-auto text-center mb-12"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#1f2937] mb-4">
          Premium Support, Tailored For You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          RentWise ensures every Tenant and Property Owner gets luxury-level care and assistance, always.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Tenants Card */}
        <div
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between text-left border border-gray-200 hover:shadow-2xl transition"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-semibold text-[#1f2937] mb-4">For Tenants</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <UserCheck className="w-6 h-6 text-[#1f2937]" />
              <span>24/7 Help Center for quick resolutions</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-6 h-6 text-[#1f2937]" />
              <span>Instant maintenance & issue support</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#1f2937]" />
              <span>Document assistance & lease help</span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-6 h-6 text-[#1f2937]" />
              <span>Personalized alerts & property updates</span>
            </li>
          </ul>
        </div>

        {/* Owners Card */}
        <div
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between text-left border border-gray-200 hover:shadow-2xl transition"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <h3 className="text-2xl font-semibold text-[#1f2937] mb-4">For Property Owners</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Home className="w-6 h-6 text-[#1f2937]" />
              <span>Dedicated owner support team</span>
            </li>
            <li className="flex items-start gap-3">
              <Wallet className="w-6 h-6 text-[#1f2937]" />
              <span>Payment & payout assistance</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#1f2937]" />
              <span>Listing management help & edits</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-6 h-6 text-[#1f2937]" />
              <span>Guidance on tenant communication</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
