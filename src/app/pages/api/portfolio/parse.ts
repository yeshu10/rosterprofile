

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { url } = req.body;

  // You can add custom mock logic here based on the URL
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid URL' });
  }

  // Return mock data based on domain or anything you like
  const mockData = {
    success: true,
    data: {
      firstName: "John",
      lastName: "Doe",
      summary: "Creative frontend developer with 5 years of experience.",
      employers: [
        {
          name: "Google",
          videos: [
            { title: "Project Demo", url: "https://example.com/video1" }
          ],
          jobTitle: "Software Engineer",
          duration: "Jan 2020 - Present",
          employmentType: "Full-time",
          contribution: "Developed major frontend features"
        }
      ]
    }
  };

  res.status(200).json(mockData);
}
