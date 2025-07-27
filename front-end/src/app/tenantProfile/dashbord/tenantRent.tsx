"use client";

import { CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
import React from "react";

// 1. Define a strict type for payment status
type PaymentStatus = "paid" | "pending" | "overdue";

// 2. Define payment history type
interface PaymentEntry {
  month: string;
  amount: string;
  status: PaymentStatus;
  date: string;
}

// 3. Component
export default function PaymentStatusCard() {
  const paymentHistory: PaymentEntry[] = [
    { month: "December 2024", amount: "₹45,000", status: "paid", date: "Dec 1" },
    { month: "November 2024", amount: "₹45,000", status: "paid", date: "Nov 1" },
    { month: "October 2024", amount: "₹45,000", status: "paid", date: "Oct 1" },
    { month: "September 2024", amount: "₹45,000", status: "pending", date: "Sep 30" },
  ];

  // 4. Return correct icon based on status
  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  // 5. Return correct badge color
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "overdue":
        return "text-red-700 bg-red-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Payment Status</h3>
      </div>

      {/* Next Payment Due */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-700 font-medium">Next Payment Due</div>
            <div className="text-xl font-bold text-blue-800">Jan 1, 2025</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-700">Amount</div>
            <div className="text-xl font-bold text-blue-800">₹45,000</div>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Recent Payments</h4>
        {paymentHistory.map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(payment.status)}
              <div>
                <div className="text-sm font-medium text-gray-900">{payment.month}</div>
                <div className="text-xs text-gray-600">Due: {payment.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{payment.amount}</div>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  payment.status
                )}`}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
