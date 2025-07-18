"use client";
import Link from "next/link";
import { useState } from "react";
import { logoutUser } from "@/components/auth/logout";
import { useUserStore } from "@/store/zustand";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  const handleLogout = () => {
    logoutUser();
    setOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        view Profile
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Dashboard</Link>
          <Link href="/profile" onClick={() => setOpen(false)} className="px-4 py-2 hover:bg-gray-100">Profile</Link>
          <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
  );
}
