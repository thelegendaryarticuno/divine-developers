import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import FileDetails from '@/models/FileDetails';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Fetch all file details from MongoDB
    const fileDetails = await FileDetails.find({});
    res.status(200).json(fileDetails);
  } catch (error) {
    console.error('Error fetching file details:', error);
    res.status(500).json({ message: 'Error fetching file details' });
  }
}
