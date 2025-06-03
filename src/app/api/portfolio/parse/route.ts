import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Mock data for testing
    const mockData = {
      success: true,
      data: {
        username: "testuser",
        basicInfo: {
          name: "Test User",
          title: "Software Developer",
          intro: "Experienced developer with a passion for web technologies",
          location: "New York, USA",
          email: "test@example.com",
          socialLinks: {
            github: "https://github.com/testuser",
            linkedin: "https://linkedin.com/in/testuser"
          }
        },
        experience: [
          {
            company: "Tech Corp",
            position: "Senior Developer",
            duration: "2020-Present",
            description: "Leading development of web applications"
          }
        ],
        skills: ["JavaScript", "React", "Node.js", "TypeScript"]
      }
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to parse portfolio" },
      { status: 400 }
    );
  }
} 