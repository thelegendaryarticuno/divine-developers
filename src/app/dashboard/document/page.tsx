'use client';

import React, { useState } from 'react';

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null); // No file selected by default
  const [message, setMessage] = useState<string | null>(null); // Message to display upload status

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage('No file selected');
      return;
    }

    try {
      const data = new FormData();
      data.set('file', file); // Append the file to FormData

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text()); // If the response is not OK, throw an error

      const result = await res.json();
      setMessage(`File uploaded successfully: ${result.filePath}`); // Success message with file path
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Upload failed: ${error.message}`);
      } else {
        setMessage('Upload failed: Unknown error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)} // Set file when selected
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!file} // Disable submit if no file is selected
        >
          Upload
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display upload status */}
    </div>
  );
};

export default DocumentUpload;
