"use client";

import React from "react";
import { useTheme } from "next-themes";

// Define a type for the document object
type Document = {
  name: string;
  status: string;
};

const DocumentUpload = () => {
  const { theme } = useTheme();

  // Explicitly define the type for the documents array
  const documents: Document[] = [
    // { name: "Document 1", status: "Complete" },
    // { name: "Document 2", status: "In Progress" },
    // { name: "Document 3", status: "Pending" },
  ];

  const hasDocuments = documents.length > 0;

  return (
    <div
      className="p-4 rounded-lg mb-4 flex flex-col items-center justify-center"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
        color: theme === "dark" ? "white" : "black",
        width: "100%",
        height: "75%",
      }}
    >
      <h3 className="text-xl font-bold mb-4">Document Upload Status</h3>

      {hasDocuments ? (
        <div className="space-y-4 w-full">
          {documents.map((doc, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{doc.name}</p>
              <p>Status: {doc.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No documents are uploaded</p>
      )}
    </div>
  );
};

export default DocumentUpload;
