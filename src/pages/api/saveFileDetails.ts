import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import FileDetails from '@/models/FileDetails';  // Add this model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, url, date, time } = req.body;

  try {
    await dbConnect();

    // Save file details to MongoDB
    const fileDetails = new FileDetails({ name, url, date, time });
    await fileDetails.save();

    res.status(201).json({ message: 'File details saved successfully' });
  } catch (error) {
    console.error('Error saving file details:', error);
    res.status(500).json({ message: 'Error saving file details' });
  }
}
