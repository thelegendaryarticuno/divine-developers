"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const ProtectiveNavbar = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

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
            setIsLoaded(true);
          } else {
            router.push("/login");
          }
        })
        .catch(() => {
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white font-bold">Dashboard</span>
        </Link>

        <div className="flex items-center space-x-4">
          <span className="text-white">{state.user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProtectiveNavbar;
