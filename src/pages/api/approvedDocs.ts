import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect'; 
import FileDetails from '@/models/FileDetails'; 

// Handler for fetching approved documents
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch all documents with the status "approved"
      const approvedDocs = await FileDetails.find({ status: 'approved' });

      // Return the approved documents as a response
      res.status(200).json(approvedDocs);
    } catch (error) {
      console.error('Error fetching approved documents:', error);
      res.status(500).json({ message: 'Server error while fetching approved documents' });
    }
  } else {
    // Handle non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
