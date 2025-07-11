"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { School, UserPlus } from "lucide-react";
import clsx from "clsx";

const roles = [
  {
    key: "owner",
    label: "Property Owner",
    desc: "List and manage luxury properties",
    icon: School,
  },
  {
    key: "tenant",
    label: "Tenant",
    desc: "Find premium luxury rentals",
    icon: UserPlus,
  },
];

type Props = {
  onSwitch: () => void;
};

export default function SignUpCard({ onSwitch }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [selectedRole, setSelectedRole] = useState<"owner" | "tenant" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", { ...formData, role: selectedRole });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Create Your Account</h3>
      <p className="text-gray-600">Select your role to begin</p>

      <div className="flex space-x-4 mt-4 mb-6">
        {roles.map(({ key, label, desc, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedRole(key as "owner" | "tenant")}
            className={clsx(
              "flex-1 py-4 px-3 rounded-lg border-2 transition-all flex flex-col items-center",
              selectedRole === key && key === "owner" && "border-yellow-900 bg-yellow-100",
              selectedRole === key && key === "tenant" && "border-blue-900 bg-blue-100",
              selectedRole !== key && key === "owner" && "border-gray-200 hover:border-yellow-300",
              selectedRole !== key && key === "tenant" && "border-gray-200 hover:border-blue-300"
            )}
          >
            <Icon
              className={clsx(
                "w-10 h-10 mb-2",
                key === "owner" ? "text-yellow-900" : "text-blue-900"
              )}
            />
            <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
            <p className="text-xs text-gray-600 mt-1 text-center">{desc}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="mt-2"
          />
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, agreedToTerms: !!checked }))
            }
          />
          <Label htmlFor="terms" className="text-blue-700 text-sm">
            I agree to RentWise's Terms and{" "}
            <Link href="/policy" className="underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        <Button
          type="submit"
          className={clsx(
            "w-full py-6 text-lg font-bold",
            selectedRole === "owner" && "bg-yellow-100 text-gray-900 hover:bg-yellow-600",
            selectedRole === "tenant" && "bg-blue-400 hover:bg-blue-950"
          )}
          disabled={!selectedRole || !formData.agreedToTerms}
        >
          Create Account
        </Button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-700 underline">
          Sign in
        </button>
      </p>
    </div>
  );
}
