"use client";
import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";

const SimpleNavbar = () => {
  const { userId, isLoaded } = useAuth();
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoaded) {
    return (
      <header className="p-5 mt-16 flex justify-between items-center bg-white shadow-sm">
        <div className="w-12 h-12"></div>
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <header className={`p-4 relative w-full z-50  ${theme === "dark" ? "bg-gray-900" : "bg-gray-400"}`}>
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          <span className={`text-${theme === "dark" ? "white" : "black"}`}>Logo</span>
        </Link>

        <div className="hidden lg:flex space-x-6">
          <Link href="/">
            <span className={`text-${theme === "dark" ? "white" : "black"}`}>Home</span>
          </Link>
          <Link href="/about">
            <span className={`text-${theme === "dark" ? "white" : "black"}`}>About</span>
          </Link>
          <Link href="/services">
            <span className={`text-${theme === "dark" ? "white" : "black"}`}>Services</span>
          </Link>

          {!userId ? (
            <>
              <Link href="/sign-in" className="text-black hover:text-gray-700">
                Sign In
              </Link>
              <Link href="/sign-up" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Register
              </Link>
            </>
          ) : (
            <>
              {pathname === '/dashboard' ? (
                <Link href="/my-data" className="text-black hover:text-gray-700">
                  My Data
                </Link>
              ) : (
                <Link href="/dashboard" className="text-black hover:text-gray-700">
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="text-black hover:text-gray-700">
                Profile
              </Link>
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded"
          >
            {theme === "dark" ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-900" />}
          </button>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600">
          <FaBars />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2">
          <Link href="/">
            <span className={`block text-${theme === "dark" ? "white" : "black"}`}>Home</span>
          </Link>
          <Link href="/about">
            <span className={`block text-${theme === "dark" ? "white" : "black"}`}>About</span>
          </Link>
          <Link href="/services">
            <span className={`block text-${theme === "dark" ? "white" : "black"}`}>Services</span>
          </Link>
          <Link href="/signin">
            <span className={`block text-${theme === "dark" ? "white" : "black"} p-2`}>Sign In</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default SimpleNavbar;
