"use client";

import { SingleImageDropzone } from "@/components/single-file-upload/single-file-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

const uploadFields = [
  { label: "10th Certificate", name: "10th Certificate" },
  { label: "12th Certificate", name: "12th Certificate" },
  { label: "Domicile Certificate", name: "Domicile Certificate" },
  { label: "Income Certificate", name: "Income Certificate" },
  { label: "Aadhaar Card", name: "Aadhaar Card" },
];

export default function Page() {
  const { theme } = useTheme();
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [urls, setUrls] = useState<
    Record<string, { url: string; thumbnailUrl: string | null }>
  >({});
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const [uploadHistory, setUploadHistory] = useState<
    {
      name: string;
      date: string;
      time: string;
      url: string;
      status: string;
      reason: string;
    }[]
  >([]);

  // Fetch upload history from MongoDB
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

  const handleFileChange = (name: string, file: File | undefined) => {
    setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
  };

  const handleUpload = async (name: string) => {
    const file = files[name];

    if (!file) {
      console.error(`No file selected for ${name}`);
      return;
    }

    try {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progressValue) => {
          setProgress((prevProgress) => ({
            ...prevProgress,
            [name]: progressValue,
          }));
        },
      });

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();

      setUrls((prevUrls) => ({
        ...prevUrls,
        [name]: { url: res.url, thumbnailUrl: res.thumbnailUrl },
      }));

      const newHistoryItem = {
        name,
        date,
        time,
        url: res.url,
        status: "pending",
        reason: " ",
      };

      setUploadHistory((prevHistory) => [...prevHistory, newHistoryItem]);

      await fetch("/api/saveFileDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          url: res.url,
          date,
          time,
          status: "pending",
          reason: " ",
        }),
      });

      toast({
        description: `${name} uploaded successfully`,
      });
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
    }
  };

  return (
    <div className="m-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Document Upload History Section */}
      <div className="lg:col-span-1">
        <h2 className="text-xl font-semibold">Uploaded Document History</h2>
        <div className="mt-4 space-y-4">
          {uploadHistory.length > 0 ? (
            uploadHistory.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md bg-gray-100 dark:bg-gray-800"
              >
                <span className="block font-medium">
                  {item.name} - {item.date} at {item.time}
                </span>
                <Link href={item.url} target="_blank">
                  <p className="text-blue-500 underline">View Document</p>
                </Link>
                <p className="mt-2">
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Comments:</strong> {item.reason || "No comments"}
                </p>
              </div>
            ))
          ) : (
            <p>No uploads yet.</p>
          )}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {uploadFields.map((field) => (
          <div key={field.name} className="flex flex-col items-center gap-2">
            <h3>{field.label}</h3>
            <SingleImageDropzone
              width={200}
              height={200}
              value={files[field.name] || undefined}
              dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
              onChange={(file) => handleFileChange(field.name, file)}
            />
            <div className="h-[6px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${progress[field.name] || 0}%` }}
              />
            </div>
            <button
              className={`px-4 py-2 rounded-lg transition-all hover:opacity-80 ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handleUpload(field.name)}
            >
              Upload
            </button>
            {urls[field.name]?.url && (
              <Link href={urls[field.name]?.url} target="_blank">
                <p className="text-blue-500 underline">SHOW UPLOADED DOC</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
