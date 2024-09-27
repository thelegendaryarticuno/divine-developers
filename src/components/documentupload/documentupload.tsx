"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

// Define a type for the document object
type Document = {
  name: string;
  date: string;
  time: string;
  url: string;
  status: string;
  reason: string;
};

const DocumentUpload = () => {
  const { theme } = useTheme();
  const [uploadHistory, setUploadHistory] = useState<Document[]>([]);

  // Fetch upload history from MongoDB (same as in page.tsx)
  useEffect(() => {
    const fetchUploadHistory = async () => {
      try {
        const response = await fetch("/api/fetchHistory");
        if (response.ok) {
          const data = await response.json();
          setUploadHistory(data);
        } else {
          console.error("Error fetching upload history:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching upload history:", error);
      }
    };

    fetchUploadHistory();
  }, []);

  const hasDocuments = uploadHistory.length > 0;

  return (
    <div
      className="p-4 rounded-lg mb-4 flex flex-col items-center justify-start"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        width: "100%",
        minHeight: "75%",
      }}
    >
      {/* Heading Section */}
      <h3 className="text-2xl font-bold mb-6 text-center">Document Upload Status</h3>

      {/* Table Section */}
      {hasDocuments ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">Document Name</th>
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">Date</th>
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">Time</th>
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">View</th>
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">Status</th>
                <th className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">Comments</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((doc, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">{doc.name}</td>
                  <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">{doc.date}</td>
                  <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">{doc.time}</td>
                  <td className="border border-gray-300 p-2 text-blue-500 underline text-xs md:text-sm lg:text-base">
                    <Link href={doc.url} target="_blank">
                      View Document
                    </Link>
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">{doc.status}</td>
                  <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">{doc.reason || "No comments"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg">No documents are uploaded</p>
      )}
    </div>
  );
};

export default DocumentUpload;
