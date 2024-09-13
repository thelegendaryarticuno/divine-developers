"use client";

import React, { useEffect } from "react";
import { FaHome, FaUpload, FaUserCheck, FaQuestionCircle, FaCog } from "react-icons/fa";
import { useTheme } from "next-themes";
import Profile from "@/components/profile/profile";
import DocumentUpload from "@/components/documentupload/documentupload";
import CalendarComponent from "@/components/calendar/calendar";
import ChatBot from "@/components/chatbot/chatbot";

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // Sidebar closed by default
  const { theme } = useTheme();

  // Use useEffect to handle screen resize and block menu on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false); // Ensure sidebar is closed by default on md and sm
      }
    };

    handleResize(); // Run on mount to ensure the correct initial state

    window.addEventListener("resize", handleResize); // Update on window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(!sidebarOpen); // Only allow toggling on lg or larger
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-15 left-0 h-full transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} p-6 flex flex-col z-10`}
      >
        {/* Hide button for screen sizes smaller than lg */}
        <button className="mb-6 hidden lg:block" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={theme === "dark" ? "white" : "black"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="space-y-16">
          <a href="#" className="flex items-center space-x-4 text-xl">
            <FaHome color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Home</span>}
          </a>
          <a href="#" className="flex items-center space-x-4 text-xl">
            <FaUpload color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Doc Upload</span>}
          </a>
          <a href="#" className="flex items-center space-x-4 text-xl">
            <FaUserCheck color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Verification</span>}
          </a>
          <a href="#" className="flex items-center space-x-4 text-xl">
            <FaQuestionCircle color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Assistance</span>}
          </a>
          <a href="#" className="flex items-center space-x-4 text-xl">
            <FaCog color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Settings</span>}
          </a>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-6 transition-all duration-300`}
        style={{
          marginLeft: sidebarOpen ? '16rem' : '5rem',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-full">
          {/* Left column: Profile and Document Upload */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-between">
            <Profile />
            <DocumentUpload />
          </div>

          {/* Right column: Calendar and Chat Bot */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <CalendarComponent date={date} setDate={setDate} />
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
