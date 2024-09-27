import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import FileDetails from "@/models/FileDetails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { documents } = req.body;

      const updatedDocuments = await Promise.all(
        documents.map(async (doc: { name: string; url: string }) => {
          const fileDetails = await FileDetails.findOne({ url: doc.url });

          // If the document is found in MongoDB, update it with the latest status and comments
          if (fileDetails) {
            return {
              ...doc,
              status: fileDetails.status || "pending",
              comments: fileDetails.comments || "No comments",
            };
          }

          // If not found, return the original document data
          return doc;
        })
      );

      res.status(200).json(updatedDocuments);
    } catch (error) {
      console.error("Error fetching document status:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
