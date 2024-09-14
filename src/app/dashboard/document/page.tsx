"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { toast } from "sonner"


const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useUser(); // Get the user object from Clerk
  const { theme } = useTheme(); // Get the current theme ('light' or 'dark')

  useEffect(() => {
    if (user) {
      console.log("User loaded: ", user.firstName, user.lastName);
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !user?.username) {
      setMessage("File and username are required");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file); // Append the file to FormData
      data.set("username", user.username); // Append the username as well

      // Call your backend API directly
      const res = await fetch("https://node-w6f2.onrender.com/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage("File uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Upload failed: ${error.message}`);
      } else {
        setMessage("Upload failed: Unknown error");
      }
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg transition-colors ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h1
        className={`text-xl font-semibold mb-4 text-center transition-colors ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Hi {user?.firstName} {user?.lastName}
      </h1>
      <p
        className={`text-center mb-6 transition-colors ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Upload your docs below:
      </p>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input type="hidden" name="username" value={user?.username || ""} />

        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className={`border p-2 rounded-lg transition-colors ${
            theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-black"
          }`}
          required
        />
        <button
          type="submit"
          className={`py-2 px-4 rounded-lg transition ${
            theme === "dark"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={!file}
        >
          Upload
        </button>
      </form>
      {message && (
        <p
          className={`text-center mt-4 transition-colors ${
            theme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;
