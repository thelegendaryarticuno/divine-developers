"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FaHome,
  FaUpload,
  FaUserCheck,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";
import DocumentUpload from "@/components/documentupload/documentupload";
import CalendarComponent from "@/components/calendar/calendar";
import ChatBot from "@/components/chatbot/chatbot";

const Profile: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("home");
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const response = await fetch(
          `/api/dashboardDesigner?fullName=${user?.fullName}`
        );
        const data = await response.json();
        if (data.onboardingStatus) {
          setOnboardingStatus(data.onboardingStatus);
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.fullName) {
      fetchOnboardingStatus();
    } else {
      setIsLoading(false);
    }
  }, [user?.fullName]);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleSidebarClick = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // If still loading, show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not found, only show the onboarding button
  if (!user?.fullName || onboardingStatus === "not_found") {
    return (
      <div
        className={`min-h-screen flex flex-col md:flex-row ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
        }`}
      >
        <div className="flex-1 p-6">
          <div className="flex justify-center my-4">
            <Link href="/onboarding">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 
                ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-200 text-black"
                }
                hover:${theme === "dark" ? "bg-blue-500" : "bg-blue-300"} 
                shadow-md`}
              >
                Start Onboarding
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-15 left-0 h-full transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        } p-6 flex flex-col z-10`}
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
          {onboardingStatus === "eligible" && (
            <a
              href="/dashboard/document"
              className="flex items-center space-x-4 text-xl"
              onClick={() => handleSidebarClick("upload")}
            >
              <FaUpload color={theme === "dark" ? "white" : "black"} />
              {sidebarOpen && <span>Doc Upload</span>}
            </a>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 h-full">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-between">
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
                <h2 className="text-3xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
              </div>
            </div>
            {onboardingStatus === "eligible" && <DocumentUpload />}
            {onboardingStatus === "ineligible" && (
              <div className="text-red-600 p-4">
                You failed to meet the basic criteria!
              </div>
            )}
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col justify-center">
            <CalendarComponent />
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
