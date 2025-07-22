"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ShieldCheck, DollarSign } from "lucide-react";

interface PricingCardProps {
  property: {
    monthlyRent?: number;
    securityDeposit?: number;
    utilitiesIncluded?: boolean;
    availableFrom?: string;
    leaseTerms?: number;
  };
}

const PricingCard: React.FC<PricingCardProps> = ({ property }) => {
  const {
    monthlyRent,
    securityDeposit,
    utilitiesIncluded,
    availableFrom,
    leaseTerms,
  } = property;

  return (
    <Card
      className="rounded-3xl p-6 shadow-md border-none bg-white"
      data-aos="fade-up"
    >
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              ₹{monthlyRent?.toLocaleString("en-IN") || "N/A"}
              <span className="text-sm text-gray-500 font-normal"> /month</span>
            </h2>
            {utilitiesIncluded && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                ✅ Utilities Included
              </p>
            )}
          </div>
          <Badge className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
            RentWise Verified
          </Badge>
        </div>

        <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>
              Security Deposit: ₹{securityDeposit?.toLocaleString("en-IN") || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-500" />
            <span>
              Available from:{" "}
              {availableFrom
                ? new Date(availableFrom).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-500" />
            <span>Lease Terms: {leaseTerms ?? "N/A"} months</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
