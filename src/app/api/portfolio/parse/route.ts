import { NextResponse } from 'next/server';
import type { PortfolioData, PortfolioParseResponse } from '@/types';

export async function POST(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    await request.json();

    // Mock data for testing
    const mockData: PortfolioData = {
      username: "testuser",
      basicInfo: {
        name: "Test User",
        title: "Software Developer",
        intro: "Experienced developer with a passion for web technologies",
        aboutMe: "I'm a highly motivated full-stack developer and video editor with a strong focus on scalable applications and engaging digital content. I specialize in creating modern web apps and crafting high-quality videos for a variety of platforms.",
        location: "New York, USA",
        email: "test@example.com",
        socialLinks: {
          github: "https://github.com/testuser",
          linkedin: "https://linkedin.com/in/testuser",
          twitter: "https://twitter.com/testuser"
        },
        myDetails: {
          availability: "Full-time, Freelance",
          jobTypes: ["Full-time", "Part-time", "Contract", "Freelance"],
          videoEditor: {
            experienceLevel: "Intermediate",
            tools: ["Adobe Premiere Pro", "After Effects", "CapCut"]
          },
          contentVerticals: [
            "Tech Tutorials",
            "Product Demos",
            "Social Media Content",
            "Vlogs"
          ],
          platformSpecialty: [
            "YouTube",
            "Instagram Reels",
            "LinkedIn",
            "TikTok"
          ],
          skills: [
            "JavaScript",
            "React",
            "Node.js",
            "Video Editing",
            "Motion Graphics"
          ],
          software: [
            "VS Code",
            "Adobe Premiere Pro",
            "Figma",
            "Notion",
            "Git"
          ],
          languages: ["English", "Spanish", "Hindi"]
        }
      },
      experience: [
        {
          id: 'exp-1',
          company: "Daniel Wall",
          position: "Thumbnail Artist",
          duration: "Sep 2024 - Sep 2024",
          description: "I worked with Daniel on a one-time project as a thumbnail designer for his interview with Ryan Tedder. ...Read more",
          type: 'Contract',
          projects: 1,
          subscribers: 1100000,
          videos: ['Why OneRepublic Told ...']
        },
        {
          id: 'exp-2',
          company: "Austin Sprinz",
          position: "Video Editor",
          duration: "Jul 2024 - Present",
          description: "As the video editor for Austin Sprinz's YouTube channel, I ...Read more",
          type: 'Freelance',
          projects: 5,
          subscribers: 7800000,
          videos: []
        },
        {
          id: 'exp-3',
          company: "Nathan Kessel",
          position: "Video Editor",
          duration: "Jun 2024 - Present",
          description: "As the long-form video editor and thumbnail designer for Nathan ...Read more",
          type: 'Freelance',
          projects: 4,
          subscribers: 10400000,
          videos: []
        }
      ],
      isAvailable: true,
      followerCount: 15000000,
      verifiedDate: 'Jan 19, 2024'
    };

    // Wrap the mock data in the correct response format
    const response: PortfolioParseResponse = {
      success: true,
      data: mockData
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error parsing portfolio:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during parsing." });
  }
}

