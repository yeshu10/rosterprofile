"use client";

import { useEffect, useState } from "react";
import { fetchProfileData, MockProfileData } from "@/utils/mockApi";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileAbout from "@/components/ProfileAbout";
import ProfileExperience from "@/components/ProfileExperience";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [profileData, setProfileData] = useState<MockProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        const data = await fetchProfileData(params.username);
        setProfileData(data);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [params.username]);

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
        <div className="lg:col-span-1">
          <ProfileSidebar
            basicInfo={profileData.basicInfo}
            username={params.username}
            onMenuItemClick={setActiveSection}
          />
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
          {activeSection === "about" && <ProfileAbout basicInfo={profileData.basicInfo} />}
          {activeSection === "experience" && <ProfileExperience employers={profileData.employers} />}
        </div>
      </div>
    </div>
  );
} 