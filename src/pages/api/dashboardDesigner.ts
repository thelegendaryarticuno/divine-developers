import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import FileDetails from '@/models/FileDetails';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { fullName } = req.query;

  if (!fullName) {
    return res.status(400).json({ error: 'Full name is required' });
  }

  try {
    const fileDetails = await FileDetails.findOne({ name: fullName });

    if (!fileDetails) {
      // If no user with the full name is found
      return res.status(404).json({ message: 'User not found', onboardingStatus: 'not_found' });
    }

    return res.status(200).json({
      message: 'User found',
      onboardingStatus: fileDetails.onboardingStatus,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
