import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import FileDetails from "@/models/FileDetails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userFullName = req.body.fullName; // Assuming you send user's full name

  await dbConnect();

  try {
    // Check if the user exists in the database by matching the full name
    const user = await FileDetails.findOne({ name: userFullName });

    if (!user) {
      return res.status(200).json({ status: "not_found" });
    }

    // Check the onboarding status from the database
    const onboardingStatus = user.onboardingStatus;

    if (onboardingStatus === "eligible") {
      return res.status(200).json({ status: "eligible" });
    } else {
      return res.status(200).json({ status: "ineligible" });
    }
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
