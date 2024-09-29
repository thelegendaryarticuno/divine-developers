import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import FileDetails from "@/models/FileDetails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { onboarding, username } = req.body;

  // Connect to the database
  await dbConnect();

  try {
    // Get current date and time in ISO format
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date().toISOString().split("T")[1]; // HH:MM:SS

    // Create a new entry in the database
    const newFile = new FileDetails({
      name: username,                // Store the user's name
      fileName: "N/A",               // Save "N/A" as FileName
      onboardingDate: currentDate,   // Store the onboarding date
      onboardingTime: currentTime,   // Store the onboarding time
      onboardingStatus: onboarding,  // Store the onboarding status (eligible/ineligible)
      url: "N/A",                    // Set URL as "N/A"
      date: "N/A",                   // Set date as "N/A"
      time: "N/A",                   // Set time as "N/A"
      status: "N/A",                 // Save status as "N/A"
    });

    // Save the new entry in the database
    await newFile.save();

    // Send a success response
    res.status(200).json({ success: true, message: "Onboarding result saved" });
  } catch (error) {
    console.error("Error saving onboarding result", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
