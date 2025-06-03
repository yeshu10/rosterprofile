// pages/api/profile/create.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const profileData = req.body;

  // You can log or check profileData here if needed
  if (!profileData || !profileData.firstName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Simulate username creation using firstName + timestamp
  const generatedUsername = `${profileData.firstName.toLowerCase()}-${Date.now()}`;

  return res.status(200).json({
    success: true,
    username: generatedUsername,
    message: "Profile created successfully"
  });
}
