"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";

const SimpleNavbar = () => {
  useEffect(() => {
    console.log("SimpleNavbar rendered");
  }, []);

  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoaded) {
    return (
      <header className="fixed top-0 left-0 right-0 p-5 flex justify-between items-center bg-white shadow-sm z-50">
        <div className="w-12 h-12"></div>
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 p-4 z-50 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-400"
        }`}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              LOGO
            </Link>

            <div className="hidden lg:flex space-x-6">
              <Link
                href="/"
                className={`text-${theme === "dark" ? "white" : "black"}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-${theme === "dark" ? "white" : "black"}`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`text-${theme === "dark" ? "white" : "black"}`}
              >
                Services
              </Link>

              {userId && (
                <Link
                  href="/dashboard"
                  className={`text-${theme === "dark" ? "white" : "black"}`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            {!userId ? (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-${theme === "dark" ? "white" : "black"}`}
                  >
                    {user?.firstName} {user?.lastName}
                  </span>
                  <div>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-gray-900" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600"
            >
              <FaBars />
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden mt-2 space-y-2">
            <Link
              href="/"
              className={`block text-${theme === "dark" ? "white" : "black"}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block text-${theme === "dark" ? "white" : "black"}`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`block text-${theme === "dark" ? "white" : "black"}`}
            >
              Services
            </Link>

            {userId && (
              <Link
                href="/dashboard"
                className={`block text-${theme === "dark" ? "white" : "black"}`}
              >
                Dashboard
              </Link>
            )}

            {!userId && (
              <Link
                href="/sign-in"
                className={`block text-${
                  theme === "dark" ? "white" : "black"
                } p-2`}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Add padding to the content below the navbar */}
      <div className="pt-16">{/* Content below the navbar goes here */}</div>
    </>
  );
};

export default SimpleNavbar;
