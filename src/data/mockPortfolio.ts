import type { PortfolioData } from '@/types';

export const mockData: PortfolioData = {
  username: "testuser",
  basicInfo: {
    name: "Test User",
    title: "Software Developer",
    intro: "Experienced developer with a passion for web technologies",
    aboutMe: "I'm a highly motivated full-stack developer and video editor with a strong focus on scalable applications and engaging digital content. I specialize in creating modern web apps and crafting high-quality videos for a variety of platforms.",
    location: "New York, USA",
    email: "test@example.com",
    profileImage: "https://randomuser.me/api/portraits/women/32.jpg",
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
          imageUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg',
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
          imageUrl: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg',
          views: 7800000,
          likes: 300000,
          platform: 'youtube',
        },
         {
          id: 'proj-2b',
          title: 'Pasta Night!',
          description: 'Short form content.',
          imageUrl: 'https://images.pexels.com/photos/8016323/pexels-photo-8016323.jpeg',
          views: 5000000,
          likes: 200000,
          platform: 'tiktok',
        },
         {
          id: 'proj-2c',
          title: 'How to choose Salad Ni...',
          description: 'Tutorial video.',
          imageUrl: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg',
          views: 3000000,
          likes: 150000,
          platform: 'instagram',
        },
         {
          id: 'proj-2d',
          title: 'How To Choose Ice Cre...',
          description: 'Fun short.',
          imageUrl: 'https://images.pexels.com/photos/4348405/pexels-photo-4348405.jpeg',
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
          imageUrl: 'https://images.pexels.com/photos/5428832/pexels-photo-5428832.jpeg',
          views: 1000000,
          likes: 50000,
          platform: 'youtube',
        },
         {
          id: 'proj-3b',
          title: 'Project Beta',
          description: 'Description for Project Beta.',
          imageUrl: 'https://images.pexels.com/photos/4348405/pexels-photo-4348405.jpeg',
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
