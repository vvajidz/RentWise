"use client";

import { Philosopher } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import AuthDialog from "@/app/auth/AuthDialog"; // ✅ Check path!

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Explore Properties", href: "/properties" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "Reviews", href: "/reviews" },
  { name: "Support", href: "/support" },
];

export default function Homenavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`${philosopher.className} fixed top-0 z-50 w-full`}>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-900 tracking-wide transition-transform hover:scale-105"
        >
          RentWise
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8">
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

        {/* Desktop Auth Combo Button */}
        <div className="hidden md:inline-flex rounded-md overflow-hidden border border-gray-900 shadow">
          <AuthDialog
            asChild
            triggerClass="px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 text-base transition-colors"
          >
            <span>Get Started</span>
          </AuthDialog>

          <AuthDialog
            asChild
            triggerClass="px-4 py-2 bg-white text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors border-l border-gray-900"
          >
            <span>Sign In</span>
          </AuthDialog>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 focus:outline-none"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white shadow-md px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-900 hover:text-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <AuthDialog
            asChild
            triggerClass="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 text-base transition-colors shadow mt-2"
          >
            <span>Get Started</span>
          </AuthDialog>

          <AuthDialog
            asChild
            triggerClass="block w-full text-center px-4 py-2 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors shadow mt-2"
          >
            <span>Sign In</span>
          </AuthDialog>
        </div>
      )}
    </nav>
  );
}
