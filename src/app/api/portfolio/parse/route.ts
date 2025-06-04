import { NextResponse } from 'next/server';
import type { PortfolioData, PortfolioParseResponse } from '@/types';

// Mock data (moved outside handlers so it can be used by GET)
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
      projects: [
        {
          id: 'proj-1a',
          title: 'Why OneRepublic Told ...',
          description: 'Thumbnail for interview with Ryan Tedder.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+1A',
          views: 19000000,
          likes: 640000,
          platform: 'youtube',
        },
      ],
      subscribers: 1100000,
    },
    {
      id: 'exp-2',
      company: "Austin Sprinz",
      position: "Video Editor",
      duration: "Jul 2024 - Present",
      description: "As the video editor for Austin Sprinz's YouTube channel, I ...Read more",
      type: 'Freelance',
      projects: [
        {
          id: 'proj-2a',
          title: 'Do NOT choose the wro...',
          description: 'Video editing for a YouTube video.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+2A',
          views: 7800000,
          likes: 300000,
          platform: 'youtube',
        },
         {
          id: 'proj-2b',
          title: 'Pasta Night!',
          description: 'Short form content.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+2B',
          views: 5000000,
          likes: 200000,
          platform: 'tiktok',
        },
         {
          id: 'proj-2c',
          title: 'How to choose Salad Ni...',
          description: 'Tutorial video.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+2C',
          views: 3000000,
          likes: 150000,
          platform: 'instagram',
        },
         {
          id: 'proj-2d',
          title: 'How To Choose Ice Cre...',
          description: 'Fun short.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+2D',
          views: 2000000,
          likes: 100000,
          platform: 'facebook',
        }
      ],
      subscribers: 7800000,
    },
    {
      id: 'exp-3',
      company: "Nathan Kessel",
      position: "Video Editor",
      duration: "Jun 2024 - Present",
      description: "As the long-form video editor and thumbnail designer for Nathan ...Read more",
      type: 'Freelance',
      projects: [
         {
          id: 'proj-3a',
          title: 'Project Alpha',
          description: 'Description for Project Alpha.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+3A',
          views: 1000000,
          likes: 50000,
          platform: 'youtube',
        },
         {
          id: 'proj-3b',
          title: 'Project Beta',
          description: 'Description for Project Beta.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Project+3B',
          views: 800000,
          likes: 40000,
          platform: 'tiktok',
        }
      ],
      subscribers: 10400000,
    }
  ],
  isAvailable: true,
  followerCount: 15000000,
  verifiedDate: 'Jan 19, 2024'
};

export async function GET(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    // In a real application, you would fetch data based on the username from the query params
    // For now, we return mock data

    const response: PortfolioParseResponse = {
      success: true,
      data: mockData
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during fetching." });
  }
}

export async function POST(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    // This handler can remain if you have a use case for POST, 
    // but it's not currently used by the client-side page.
    await request.json(); // Consume the body if needed

    // Wrap the mock data in the correct response format (or handle POST logic)
    const response: PortfolioParseResponse = {
      success: true,
      data: mockData // Or data processed from the POST request
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error processing POST portfolio:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during parsing." });
  }
}

