"use client";

import { Philosopher } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthDialog from "@/app/auth/AuthDialog";
import clsx from "clsx";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "How it Works", href: "#how-it-works" },
  { name: "Reviews", href: "#reviews" },
  { name: "Support", href: "#support" },
  { name: "About", href: "#about" },
];

export default function Homenavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : false);

  useEffect(() => {
    const handleScroll = () => {
      const howItWorksSection = document.getElementById("how-it-works");
      if (howItWorksSection) {
        const sectionTop = howItWorksSection.offsetTop;
        if (window.scrollY + 60 >= sectionTop) {
          setShowDesktopNav(false);
        } else {
          setShowDesktopNav(true);
        }
      }
    };

    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
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

  return (
    <>
      {/* Desktop navbar */}
      {showDesktopNav && (
        <nav
          className={`${philosopher.className} hidden md:block fixed top-0 bg-white z-50 w-full  transition-transform duration-500`}
        >
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 tracking-wide transition-transform hover:scale-105"
            >
              RentWise
            </Link>

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

            <div className="inline-flex rounded-md overflow-hidden border border-gray-900 shadow">
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
          </div>
        </nav>
      )}

      {/* Mobile logo only */}
      <div className="block md:hidden py-4 text-center w-full">
        <Link
          href="/"
          className={`${philosopher.className} text-3xl font-bold text-gray-900 tracking-wide transition-transform hover:scale-105`}
        >
          RentWise
        </Link>
      </div>

      {/* Floating mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-6 right-6 md:hidden bg-gray-900 text-white rounded-full p-3 shadow-lg focus:outline-none z-50"
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

      {/* Mobile floating menu container */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed bottom-20 right-6 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-40 flex flex-col px-4 py-4 space-y-2 transform transition-all duration-300",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block text-gray-900 hover:text-gray-700 transition-colors text-base"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        <AuthDialog
          asChild
          triggerClass="block w-full text-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 text-base transition-colors shadow"
        >
          <span>Get Started</span>
        </AuthDialog>

        <AuthDialog
          asChild
          triggerClass="block w-full text-center px-4 py-2 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors shadow"
        >
          <span>Sign In</span>
        </AuthDialog>
      </div>
    </>
  );
}
