"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { useTheme } from "next-themes"; // Assuming you are using next-themes or similar setup

const RBAC: React.FC = () => {
  const { theme } = useTheme(); // Get the current theme (light or dark)
  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<string>("");
  const router = useRouter();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
    if (event.target.value === "Student") {
      router.push("/dashboard");
    }
  };

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleSubmit = () => {
    if (id.length === 8) {
      if (role === "SAG Bureau Official") {
        router.push("/sag-dashboard");
      } else if (role === "Finance Department") {
        router.push("/finance-dashboard");
      }
    } else {
      alert("Please enter a valid 8-digit ID number.");
    }
  };

  // Tailwind classes with conditional color application based on theme
  const containerClass = `p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4 ${
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`;
  
  const inputClass = `block w-full p-2 border rounded-md ${
    theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
  }`;

  const buttonClass = `mt-4 w-full font-bold py-2 px-4 rounded ${
    theme === "dark"
      ? "bg-blue-700 hover:bg-blue-800 text-white"
      : "bg-blue-500 hover:bg-blue-700 text-white"
  }`;

  return (
    <div className={containerClass}>
      <h2 className="text-center text-lg font-semibold">What is your role?</h2>
      <select
        className={inputClass}
        value={role}
        onChange={handleRoleChange}
      >
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="SAG Bureau Official">SAG Bureau Official</option>
        <option value="Finance Department">Finance Department</option>
      </select>
      {(role === "SAG Bureau Official" || role === "Finance Department") && (
        <div>
          <label className="block text-sm font-medium">
            What is your ID no.?
          </label>
          <input
            type="text"
            className={inputClass}
            value={id}
            onChange={handleIDChange}
          />
          <button
            className={buttonClass}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RBAC;
