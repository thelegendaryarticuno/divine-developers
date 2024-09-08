"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const SimpleNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch('/me', {
        headers: { Authorization: token }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch({ type: "LOGIN", payload: data.user });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setMounted(true);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  if (!mounted) return null;

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
        </div>

        <div className="flex items-center space-x-4">
          {state.user ? (
            <div className="flex items-center space-x-2">
              <img
                src={state.user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className={`text-${theme === "dark" ? "white" : "black"}`}>{state.user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/Register">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                Register Here
              </button>
            </Link>
          )}

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
        </div>
      )}
    </header>
  );
};

export default SimpleNavbar;
