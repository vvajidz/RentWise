"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/zustand";

type Props = {
  onSwitch: () => void;
};

export default function SignInCard({ onSwitch }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setUser({
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
      });

      toast.success("Logged in successfully 🚀");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Clicked Google login");
    // Add Google login logic here
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

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="mt-2 pr-10" // add padding for eye icon
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-7 right-3 text-gray-500"
          >
            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </button>
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
