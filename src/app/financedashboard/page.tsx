"use client";

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
import CalendarComponent from "@/components/calendar/calendar";
import ChatBot from "@/components/chatbot/chatbot";

const Profile = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("home");
  const [approvedFiles, setApprovedFiles] = useState<any[]>([]);
  const [disbursementOptions, setDisbursementOptions] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch only approved documents from the new API endpoint
  useEffect(() => {
    const fetchApprovedDocs = async () => {
      try {
        const response = await fetch("/api/approvedDocs");
        const data = await response.json();
        setApprovedFiles(data);
      } catch (error) {
        console.error("Error fetching approved documents:", error);
      }
    };
    fetchApprovedDocs();
  }, []);

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

  const handleDisbursementClick = (id: string) => {
    setDisbursementOptions(id);
  };

  const handleDisbursementToChildren = (id: string) => {
    // Call disbursement to children API here
    console.log("Disbursed to children:", id);
  };

  const handleDisbursementToCollege = (id: string) => {
    // Call disbursement to college API here
    console.log("Disbursed to college:", id);
  };

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
        } ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} p-6 flex flex-col z-10`}
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
        style={{ marginLeft: sidebarOpen ? "16rem" : "5rem" }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Document Upload Section (Left) */}
          <div className="lg:w-2/3 bg-gray-400 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Approved Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedFiles.map((file) => (
                <div
                  key={file._id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col space-y-2"
                >
                  <h3 className="text-xl font-semibold">{file.name}</h3>
                  <p>
                    {file.date} {file.time}
                  </p>
                  <a
                    href={file.url}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                  {disbursementOptions === file._id ? (
                    <div className="flex flex-col sm:flex-row sm:space-x-2 mt-4 space-y-2 sm:space-y-0">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                        onClick={() => handleDisbursementToChildren(file._id)}
                      >
                        Disbursement to Children
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                        onClick={() => handleDisbursementToCollege(file._id)}
                      >
                        Disbursement to College
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                      onClick={() => handleDisbursementClick(file._id)}
                    >
                      Approve Disbursement
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar and ChatBot Section (Right) */}
          <div className="lg:w-1/3 flex flex-col space-y-4">
            <div className="flex-1">
              <CalendarComponent />
            </div>
            {/* <div className="flex-1">
              <ChatBot />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
