"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "next-themes";

const ServicesSection = () => {
  const { theme } = useTheme(); // Get the current theme
  const [isOpen, setIsOpen] = useState([false, false, false]);

  // Toggle the dropdown for a specific service
  const toggleOpen = (index: number) => {
    setIsOpen((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  return (
    <div
      className={`w-full h-[45vh] flex flex-col items-center justify-center p-6 my-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">Services We Offer</h2>

      <div className="flex justify-between w-full max-w-6xl space-x-6">
        {/* Service 1 */}
        <div
          className={`w-1/3 p-6 rounded-lg shadow-lg flex flex-col items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => toggleOpen(0)}
          >
            <h3 className="text-xl font-semibold">Document Submission</h3>
            {isOpen[0] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[0] && (
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          )}
        </div>

        {/* Service 2 */}
        <div
          className={`w-1/3 p-6 rounded-lg shadow-lg flex flex-col items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => toggleOpen(1)}
          >
            <h3 className="text-xl font-semibold">Document Verification</h3>
            {isOpen[1] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[1] && (
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          )}
        </div>

        {/* Service 3 */}
        <div
          className={`w-1/3 p-6 rounded-lg shadow-lg flex flex-col items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => toggleOpen(2)}
          >
            <h3 className="text-xl font-semibold">
              Scholarship Approval Assistance
            </h3>
            {isOpen[2] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen[2] && (
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
