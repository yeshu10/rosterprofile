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
          },
          aboutMe:
            "I’m a highly motivated full-stack developer and video editor with a strong focus on scalable applications and engaging digital content. I specialize in creating modern web apps and crafting high-quality videos for a variety of platforms.",
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

// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { url } = await request.json();

//     // Mock data for testing
//     const mockData = {
//       success: true,
//       data: {
//         username: "testuser",
//         basicInfo: {
//           name: "Test User",
//           title: "Software Developer",
//           intro: "Experienced developer with a passion for web technologies",
//           location: "New York, USA",
//           email: "test@example.com",
//           socialLinks: {
//             github: "https://github.com/testuser",
//             linkedin: "https://linkedin.com/in/testuser"
//           }
//         },
//         experience: [
//           {
//             company: "Tech Corp",
//             position: "Senior Developer",
//             duration: "2020-Present",
//             description: "Leading development of web applications"
//           }
//         ],
//         skills: ["JavaScript", "React", "Node.js", "TypeScript"]
//       }
//     };

//     return NextResponse.json(mockData);
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to parse portfolio" },
//       { status: 400 }
//     );
//   }
// } 