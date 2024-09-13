"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { FaHome, FaUpload, FaUserCheck, FaQuestionCircle, FaCog } from "react-icons/fa";
import DocumentUpload from "@/components/documentupload/documentupload";
import CalendarComponent from "@/components/calendar/calendar";
import ChatBot from "@/components/chatbot/chatbot";

const Profile = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [date, setDate] = React.useState<Date>(new Date()); // Remove undefined from the type
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // Sidebar closed by default
  const [activePage, setActivePage] = React.useState<string>("home"); // Default active page

  // Handle screen resizing to toggle sidebar for smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false); // Ensure sidebar is closed by default on smaller screens
      }
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize); // Listen to window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []);

  // Toggle sidebar for larger screens
  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(!sidebarOpen); // Toggle only for lg screens or larger
    }
  };

  // Handle sidebar item click
  const handleSidebarClick = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false); // Close sidebar on smaller screens after selection
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}>
      {/* Sidebar */}
      <div
        className={`fixed top-15 left-0 h-full transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} p-6 flex flex-col z-10`}
      >
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

        {/* Sidebar Links */}
        <div className="space-y-16">
          <a
            href="#"
            className="flex items-center space-x-4 text-xl"
            onClick={() => handleSidebarClick("home")}
          >
            <FaHome color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Home</span>}
          </a>
          <a
            href="/dashboard/document"
            className="flex items-center space-x-4 text-xl"
            onClick={() => handleSidebarClick("upload")}
          >
            <FaUpload color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Doc Upload</span>}
          </a>
          <a
            href="#"
            className="flex items-center space-x-4 text-xl"
            onClick={() => handleSidebarClick("verification")}
          >
            <FaUserCheck color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Verification</span>}
          </a>
          <a
            href="#"
            className="flex items-center space-x-4 text-xl"
            onClick={() => handleSidebarClick("assistance")}
          >
            <FaQuestionCircle color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Assistance</span>}
          </a>
          <a
            href="#"
            className="flex items-center space-x-4 text-xl"
            onClick={() => handleSidebarClick("settings")}
          >
            <FaCog color={theme === "dark" ? "white" : "black"} />
            {sidebarOpen && <span>Settings</span>}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-6 transition-all duration-300"
        style={{
          marginLeft: sidebarOpen ? "16rem" : "5rem",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 h-full">
          {/* Left column: Profile and Document Upload */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-between">
            {/* Profile Component */}
            <div
              className="p-4 rounded-lg mb-4 flex items-center space-x-4"
              style={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
                color: theme === "dark" ? "white" : "black",
                width: "100%",
              }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                <UserButton />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-500">New York, USA</p>
                <p className="text-gray-500">Not yet!</p>
              </div>
            </div>

            <DocumentUpload />
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col justify-center">
            <div className="">
              <CalendarComponent/>
            </div>
            <div className="mt-2 flex-1 w-[100%] h-[50%]">
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
