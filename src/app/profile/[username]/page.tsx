"use client";

import { useEffect, useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileAbout from "@/components/ProfileAbout";
import ProfileExperience from "@/components/ProfileExperience";

// Assuming the API response structure for GET /api/profile/[username]
interface RealProfileData {
  basicInfo: {
    firstName: string;
    lastName: string;
    intro: string;
    // Add other basic info fields if the API provides them
  };
  employers: {
    id: number;
    name: string;
    jobTitle: string;
    duration: string;
    type: "Full-time" | "Contract" | "Freelance";
    summary: string;
    videos: string[];
    // Add other employer fields if the API provides them
  }[];
  // Add other top-level profile data fields if the API provides them (like skills, projects, etc.)
}

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [profileData, setProfileData] = useState<RealProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        // Fetch data from the real API endpoint
        const response = await fetch(`/api/profile/${params.username}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data: RealProfileData = await response.json();
        setProfileData(data);
      } catch (err: any) {
        console.error("API Fetch Error:", err);
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [params.username]); // Depend on params.username

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileSidebar
            basicInfo={profileData.basicInfo}
            username={params.username} // Pass params.username
            onMenuItemClick={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
          {activeSection === "about" && <ProfileAbout basicInfo={profileData.basicInfo} />}
          {activeSection === "experience" && profileData.employers && <ProfileExperience employers={profileData.employers} />}
          {/* Add more sections based on activeSection state and available data */}
        </div>
      </div>
    </div>
  );
} 