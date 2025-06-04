export interface BasicInfo {
  name: string;
  title: string;
  intro: string;
  aboutMe: string;
  location: string;
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  myDetails: {
    availability: string;
    jobTypes: string[];
    videoEditor: {
      experienceLevel: string;
      tools: string[];
    };
    contentVerticals: string[];
    platformSpecialty: string[];
    skills: string[];
    software: string[];
    languages: string[];
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  projects?: Project[];
  subscribers?: number;
  startDate?: string;
  endDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  views?: number;
  likes?: number;
  platform?: string;
}

export interface PortfolioData {
  username: string;
  basicInfo: BasicInfo;
  experience: Experience[];
  isAvailable?: boolean;
  followerCount?: number;
  verifiedDate?: string;
}

export interface PortfolioParseResponse {
  success: boolean;
  data?: PortfolioData;
  message?: string;
}

export interface ProfileCreateResponse {
  success: boolean;
  username?: string;
  message?: string;
} 