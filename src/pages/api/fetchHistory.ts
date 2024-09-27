import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; 
import FileDetails from "@/models/FileDetails"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const files = await FileDetails.find();
    const formattedFiles = files.map((file) => ({
      name: file.name,
      date: file.date,
      time: file.time,
      url: file.url,
      status: file.status,
      reason: file.reason || "No comments",
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching file history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
