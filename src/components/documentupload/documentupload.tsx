"use client";

import React from "react";
import { useTheme } from "next-themes";

const DocumentUpload = () => {
  const { theme } = useTheme();

  return (
    <div
      className="p-4 rounded-lg mb-4"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        width: "100%",
        height: "100%",
      }}
    >
      <h3 className="text-xl font-bold">Document upload status</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p>Document 1</p>
          <p>Status: Complete</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Document 2</p>
          <p>Status: In Progress</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Document 3</p>
          <p>Status: Pending</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
