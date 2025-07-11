"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc"; // using react-icons for Google logo

type Props = {
  onSwitch: () => void;
};

export default function SignInCard({ onSwitch }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  const handleGoogleLogin = () => {
    console.log("Clicked Google login");
    // You can integrate your Google login logic here
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h3>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-5 text-base font-medium border-gray-300 hover:bg-gray-50"
      >
        <FcGoogle className="w-6 h-6" />
        Continue with Google
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Enter your password"
            required
            className="mt-2"
          />
        </div>
        <Button type="submit" className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-900">
          Login
        </Button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-700 underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
