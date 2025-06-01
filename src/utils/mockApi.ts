export interface BasicInfo {
  firstName: string;
  lastName: string;
  intro: string;
}

export interface Employer {
  id: number;
  name: string;
  jobTitle: string;
  duration: string;
  type: "Full-time" | "Contract" | "Freelance";
  summary: string;
  videos: string[];
}

export interface MockProfileData {
  basicInfo: BasicInfo;
  employers: Employer[];
}

export async function fetchProfileData(username: string): Promise<MockProfileData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));


  const mockBasicInfo: BasicInfo = {
    firstName: username.charAt(0).toUpperCase() + username.slice(1),
    lastName: "Profile",
    intro: `Welcome to ${username}'s mock profile. This is a simulated introduction based on the username extracted from the URL.`,
  };

  const mockEmployers: Employer[] = [
    {
      id: 1,
      name: "Mock Company A",
      jobTitle: "Mock Title 1",
      duration: "Jan 2022 - Dec 2022",
      type: "Full-time",
      summary: "Worked on various projects for Mock Company A.",
      videos: ["mockvideo1", "mockvideo2"],
    },
    {
      id: 2,
      name: "Mock Client B",
      jobTitle: "Mock Project Role",
      duration: "Mar 2023 - Jun 2023",
      type: "Contract",
      summary: "Completed a contract project for Mock Client B.",
      videos: ["mockvideo3"],
    },
  ];

  return { basicInfo: mockBasicInfo, employers: mockEmployers };
} 