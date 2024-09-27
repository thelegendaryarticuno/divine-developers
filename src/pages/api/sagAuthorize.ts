import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/lib/dbConnect';
import authDetails from "@/models/FileDetails";

export default async function sagAuthorize(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, status, reason } = req.body;

    try {
      await dbConnect();

      // Explicitly type the update object
      const update: { status: string; reason?: string } = { status };

      if (status === "rejected" && reason) {
        update.reason = reason;
      }

      await authDetails.findByIdAndUpdate(id, update);

      res.status(200).json({ message: "Document status updated successfully" });
    } catch (error) {
      console.error("Error updating document status:", error);
      res.status(500).json({ error: "Failed to update document status" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
