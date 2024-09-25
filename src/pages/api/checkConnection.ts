import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    await dbConnect();

    // Send a successful response
    res.status(200).json({ message: 'Database connection successful' });
  } catch (error) {
    // Log and send an error response
    console.error('Database connection failed', error);
    res.status(500).json({ message: 'Database connection failed', error });
  }
}
