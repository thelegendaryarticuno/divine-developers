'use client';

import React, { useState } from 'react';

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null); // Use null to indicate no file selected

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) return; // Exit if no file is selected

    try {
      const data = new FormData();
      data.append('file', file); // Append the file to FormData

      const res = await fetch('/api/upload', { // Adjust endpoint as necessary
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text()); // Handle non-OK responses

      const result = await res.json(); // Parse the JSON response
      console.log('File uploaded successfully:', result); // Success message
    } catch (error) {
      console.error('Upload failed:', error); // Handle errors
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)} // Handle file selection
        className="border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={!file} // Disable if no file is selected
      >
        Upload
      </button>
    </form>
  );
};

export default DocumentUpload;
