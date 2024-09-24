"use client";

import { SingleImageDropzone } from "@/components/single-file-upload/single-file-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

// Define the initial fields to be uploaded
const uploadFields = [
  { label: "10th Certificate", name: "10thCertificate" },
  { label: "12th Certificate", name: "12thCertificate" },
  { label: "Domicile Certificate", name: "domicileCertificate" },
  { label: "Income Certificate", name: "incomeCertificate" },
  { label: "Aadhaar Card", name: "aadhaarCard" },
];

export default function Page() {
  const { theme } = useTheme();
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [urls, setUrls] = useState<Record<string, { url: string; thumbnailUrl: string | null }>>({});
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();

  // State for checkboxes
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasDiploma, setHasDiploma] = useState(false);

  // Upload history state, persisted in local storage
  const [uploadHistory, setUploadHistory] = useState<
    { name: string; date: string; time: string; url: string }[]
  >([]);

  // Load upload history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("uploadHistory");
    if (storedHistory) {
      setUploadHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save upload history to localStorage whenever it updates
  useEffect(() => {
    if (uploadHistory.length > 0) {
      localStorage.setItem("uploadHistory", JSON.stringify(uploadHistory));
    }
  }, [uploadHistory]);

  const handleFileChange = (name: string, file: File | undefined) => {
    setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
  };

  const handleUpload = async (name: string) => {
    const file = files[name];

    // Ensure file is defined before proceeding
    if (!file) {
      console.error(`No file selected for ${name}`);
      return; // Exit if no file is selected
    }

    try {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progressValue) => {
          setProgress((prevProgress) => ({ ...prevProgress, [name]: progressValue }));
        },
      });

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();

      // Update the uploaded file URL
      setUrls((prevUrls) => ({
        ...prevUrls,
        [name]: { url: res.url, thumbnailUrl: res.thumbnailUrl },
      }));

      // Add upload details to history
      const newHistoryItem = {
        name,
        date,
        time,
        url: res.url,
      };

      setUploadHistory((prevHistory) => [...prevHistory, newHistoryItem]);

      // Trigger toast notification
      toast({
        description: `${name} uploaded successfully.`,
      });
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
    }
  };

  return (
    <div className="m-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadFields.map((field) => (
          <div key={field.name} className="flex flex-col items-center gap-2">
            <h3>{field.label}</h3>
            <SingleImageDropzone
              width={200}
              height={200}
              value={files[field.name] || undefined}  // Ensure file is passed or null
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
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
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

      {/* Checkbox for disability */}
      <div className="flex gap-2 items-center my-4">
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={() => setIsDisabled((prev) => !prev)}
        />
        <label>Are you disabled?</label>
      </div>

      {isDisabled && (
        <div className="flex flex-col items-center gap-2">
          <h3>Disability Certificate</h3>
          <SingleImageDropzone
            width={200}
            height={200}
            value={files["disabilityCertificate"]}
            dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
            onChange={(file) => handleFileChange("disabilityCertificate", file)}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress["disabilityCertificate"] || 0}%` }}
            />
          </div>
          <button
            className={`px-4 py-2 rounded-lg transition-all hover:opacity-80 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleUpload("disabilityCertificate")}
          >
            Upload
          </button>
          {urls["disabilityCertificate"]?.url && (
            <Link href={urls["disabilityCertificate"]?.url} target="_blank">
              <p className="text-blue-500 underline">SHOW UPLOADED DOC</p>
            </Link>
          )}
        </div>
      )}

      {/* Checkbox for diploma */}
      <div className="flex gap-2 items-center my-4">
        <input
          type="checkbox"
          checked={hasDiploma}
          onChange={() => setHasDiploma((prev) => !prev)}
        />
        <label>Have you done a diploma?</label>
      </div>

      {hasDiploma && (
        <div className="flex flex-col items-center gap-2">
          <h3>Polytechnic Diploma Certificate</h3>
          <SingleImageDropzone
            width={200}
            height={200}
            value={files["diplomaCertificate"]}
            dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
            onChange={(file) => handleFileChange("diplomaCertificate", file)}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress["diplomaCertificate"] || 0}%` }}
            />
          </div>
          <button
            className={`px-4 py-2 rounded-lg transition-all hover:opacity-80 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleUpload("diplomaCertificate")}
          >
            Upload
          </button>
          {urls["diplomaCertificate"]?.url && (
            <Link href={urls["diplomaCertificate"]?.url} target="_blank">
              <p className="text-blue-500 underline">SHOW UPLOADED DOC</p>
            </Link>
          )}
        </div>
      )}

      {/* Uploaded Document History Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Uploaded Document History</h2>
        <div className="mt-4 space-y-2">
          {uploadHistory.length > 0 ? (
            uploadHistory.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} - {item.date} at {item.time}
                </span>
                <Link href={item.url} target="_blank">
                  <span className="text-blue-500 underline">View Document</span>
                </Link>
              </div>
            ))
          ) : (
            <p>No uploads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
