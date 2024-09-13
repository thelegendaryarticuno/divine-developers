"use client";

import React, { useState } from "react";

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(""); // State for username
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !username) {
      setMessage("File and username are required");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file); // Append the file to FormData
      data.set("username", username); // Append the username

      // Call your backend API directly
      const res = await fetch("https://node-w6f2.onrender.com/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      setMessage(`File uploaded successfully: ${result.filePath}`);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Upload failed: ${error.message}`);
      } else {
        setMessage("Upload failed: Unknown error");
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!file || !username}
        >
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentUpload;
