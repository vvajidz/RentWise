"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { logoutUser } from "@/components/auth/logout";
import { useUserStore } from "@/store/zustand/zustand";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUserStore();
  const pathname = usePathname() ?? ""; // Handle null safely
  const router = useRouter();

  // Check screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  // 🔥 Route-based link logic
  let links: { name: string; href: string }[] = [];

  const isTenantProfile = pathname === "/tenantProfile";
  const isHome = pathname === "/" || pathname === "/all-properties";

  if (isTenantProfile) {
    links = [
      { name: "Home", href: "/all-properties" },
      { name: "Dashboard", href: "/dashboard" },
    ];
  } else if (isHome) {
    links = [
      { name: "View Profile", href: "/tenantProfile" },
      { name: "Dashboard", href: "/dashboard" },
    ];
  } else {
    // fallback for any other route
    links = [
      { name: "Home", href: "/all-properties" },
      { name: "Dashboard", href: "/dashboard" },
    ];
  }

  return (
    <div className="relative">
      {/* Desktop Button */}
      {!isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Profile
        </button>
      )}

      {/* Desktop Dropdown */}
      {!isMobile && open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              logoutUser();
              setOpen(false);
              router.push("/");
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Floating Button */}
      {isMobile && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-full p-3 shadow-lg z-50"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {open && (
            <div className="fixed bottom-20 right-6 w-64 bg-white border rounded-lg shadow-xl p-4 z-40 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                  router.push("/");
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
