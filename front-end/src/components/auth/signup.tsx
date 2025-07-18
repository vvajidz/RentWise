"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import Link from "next/link";
import clsx from "clsx";
import PasswordInput from "./password";
import RoleSelector from "./roleSelector";
import { useUserStore } from "@/store/zustand";

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

  const {setUser} = useUserStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("You must agree to the Terms and Privacy Policy");
      return;
    }

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
      agreedToTerms: formData.agreedToTerms,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      //Set user in Zustand after success--------------------------

      setUser({
        fullName:data.user.fullName,
        email:data.user.email,
        role:data.user.role
      })
    // --------------------------------------

      toast.success("Account Created!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Create Your Account</h3>
      <p className="text-gray-600">Select your role to begin</p>

      <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

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
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          label="Password"
          required
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          label="Confirm Password"
          required
        />
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
