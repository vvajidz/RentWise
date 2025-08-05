"use client";

import React, { useState, useCallback, memo, useEffect } from "react";
import { Eye, EyeOff, Building, Key, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

// --------- Memoized InputField ----------
const InputField = memo(({
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  showPasswordToggle = false,
  onTogglePassword,
  aosDelay
}: {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  aosDelay?: number;
}) => (
  <div className="relative group" data-aos="fade-up" data-aos-delay={aosDelay}>
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
      required
    />
    {showPasswordToggle && (
      <button
        type="button"
        tabIndex={-1}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onTogglePassword}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        {type === "password" ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    )}
  </div>
));
InputField.displayName = "InputField";

// --------- Memoized Background ----------
const BackgroundElements = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-bounce delay-500" />
  </div>
));
BackgroundElements.displayName = "BackgroundElements";

// --------- Memoized FloatingIcons ----------
const FloatingIcons = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <Building className="absolute top-20 left-20 w-8 h-8 text-white/10 animate-float" />
    <Building className="absolute top-40 right-32 w-6 h-6 text-white/10 animate-float delay-1000" />
    <Building className="absolute bottom-32 left-1/4 w-10 h-10 text-white/10 animate-float delay-2000" />
    <Key className="absolute top-1/3 right-20 w-7 h-7 text-white/10 animate-float delay-1500" />
  </div>
));
FloatingIcons.displayName = "FloatingIcons";

// --------- Memoized Header ----------
const LoginHeader = memo(() => (
  <div className="text-center mb-8" data-aos="fade-down">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl mb-4 shadow-lg">
      <Building className="w-10 h-10 text-white" />
    </div>
    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
    <p className="text-gray-300">Property Management System</p>
  </div>
));
LoginHeader.displayName = "LoginHeader";

// --------- Main Component ----------
const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post(
        "/admin/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      router.push("/adminDashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundElements />
      <FloatingIcons />
      <div
        className="relative w-full max-w-md"
        data-aos="zoom-in"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer"></div>
          <LoginHeader />

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              aosDelay={100}
            />
            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              showPasswordToggle
              onTogglePassword={togglePassword}
              aosDelay={200}
            />

            <button
              type="submit"
              disabled={isLoading}
              data-aos="fade-up"
              data-aos-delay="300"
              className="w-full bg-gradient-to-r from-blue-800 to-blue-950 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
