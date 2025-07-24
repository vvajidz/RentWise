"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/zustand/zustand";
import { useAuthSync } from "@/store/me";
import UserDropdown from "@/components/auth/loginDrop";
import AuthButtons from "@/components/auth/authButton";
import { logoutUser } from "@/components/auth/logout";

const navLinks = [
  { name: "How it Works", href: "#how-it-works" },
  { name: "Reviews", href: "#reviews" },
  { name: "Support", href: "#support" },
  { name: "About", href: "#about" },
];

export default function Homenavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : false);

  const { user } = useUserStore();
  const pathname = usePathname();
  useAuthSync();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("how-it-works");
      if (section) {
        setShowDesktopNav(window.scrollY + 60 < section.offsetTop);
      }
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesktop && menuOpen) {
      setMenuOpen(false);
    }
  }, [isDesktop, menuOpen]);

  const isHomePage = pathname === "/";

  return (
    <>
      {showDesktopNav && (
        <nav className="hidden md:block fixed top-0 bg-white z-50 w-full transition-transform duration-500">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 tracking-wide transition-transform hover:scale-105"
            >
              RentWise
            </Link>

            {/* Only show nav links on home page */}
            {isHomePage && (
              <div className="flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative inline-block text-gray-900 hover:text-gray-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {user ? <UserDropdown /> : <AuthButtons />}
          </div>
        </nav>
      )}

      {/* Mobile logo */}
      <div className="block md:hidden py-4 text-center w-full">
        <Link
          href="/"
          className=" text-3xl font-bold text-gray-900 tracking-wide transition-transform hover:scale-105"
        >
          RentWise
        </Link>
      </div>

      {/* Mobile floating menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-20 right-6 md:hidden bg-gray-900 text-white rounded-full p-3 shadow-lg z-50"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        className={clsx(
          "fixed bottom-20 right-6 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-40 flex flex-col px-4 py-4 space-y-2 transform transition-all duration-300",
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Only show navLinks on home page */}
        {isHomePage &&
          navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-900 hover:text-gray-700 transition-colors text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

        {user ? (
          <>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 text-base transition-colors shadow"
            >
              Dashboard
            </Link>
            <Link
              href="/tenantProfile"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors shadow"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                logoutUser();
                setMenuOpen(false);
              }}
              className="block px-4 py-2 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors shadow"
            >
              Logout
            </button>
          </>
        ) : (
          <AuthButtons />
        )}
      </div>
    </>
  );
}
