"use client";
import React from "react";
import { useTheme } from "next-themes";

const ServicesSection = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 my-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">Services We Offer</h2>

      {/* Responsive grid layout */}
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 w-full max-w-6xl">
        {/* Service 1 */}
        <div
          className={`p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Document Submission</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>

        {/* Service 2 */}
        <div
          className={`p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Document Verification</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>

        {/* Service 3 */}
        <div
          className={`p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Scholarship Approval Assistance
          </h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
