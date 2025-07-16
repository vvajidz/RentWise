"use client";

import { Building2, KeyRound, Home, Sparkles } from "lucide-react";
import { Philosopher } from "next/font/google";
import useAOS from "../../hooks/aox"; // ✅ use hook

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Find Your Dream Property",
    description: "Explore premium luxury listings curated to match your vibe and lifestyle goals.",
    icon: <Building2 className="text-[#1f2937]" size={32} />,
  },
  {
    title: "Connect with Verified Owners",
    description: "Chat and negotiate directly with trusted property owners — transparency first.",
    icon: <KeyRound className="text-[#1f2937]" size={32} />,
  },
  {
    title: "Book & Move In Smoothly",
    description: "Easy online booking, secure payments, and VIP-level move-in support.",
    icon: <Home className="text-[#1f2937]" size={32} />,
  },
  {
    title: "Enjoy Exclusive Support",
    description: "Get 24/7 assistance and premium aftercare service to keep life stress-free.",
    icon: <Sparkles className="text-[#1f2937]" size={32} />,
  },
];

export default function HowItWorks() {
  useAOS(); // 💥 use hook instead of useEffect directly

  return (
    <section
      id="how-it-works"
      className={`bg-[#fdfcf9] py-20 px-6 text-center ${philosopher.className}`}
    >
      <h2
        className="text-3xl md:text-5xl font-bold text-[#1f2937] mb-4"
        data-aos="fade-up"
      >
        How It Works
      </h2>
      <p
        className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-12"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Renting made simple, luxurious, and totally stress-free. Here’s how RentWise makes it all happen.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay={600 + index * 200}
          >
            <div className="bg-[#fdfcf9] rounded-full p-3 mb-4 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-[#1f2937] mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
