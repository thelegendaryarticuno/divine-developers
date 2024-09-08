"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";

const SimpleNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className={`p-4 fixed w-full z-50 ${theme === "dark" ? "bg-gray-900" : "bg-gray-400"}`}>
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          <span className={`text-${theme === "dark" ? "white" : "black"}`}>
            Logo
          </span>
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
          <Link href="/signin">
              <span className={`text-${theme === "dark" ? "white" : "black"} p-2`}>Sign In</span>
          </Link>
          <Link href="/register">
              <span className={`text-${theme === "dark" ? "white" : "black"} p-2`}>Register</span>
          </Link>
          
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
