export interface BasicInfo {
  name: string;
  title: string;
  intro: string;
  location: string;
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface PortfolioData {
  username: string;
  basicInfo: BasicInfo;
  experience: Experience[];
  skills: string[];
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