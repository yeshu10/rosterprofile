"use client";

import { useEffect, useState } from "react";
import ProfileDisplay from "../../components/ProfileDisplay";
import { fetchProfileData, MockProfileData } from "@/utils/mockApi";

interface ProfilePageProps {
  params: { slug: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = params;

  const [profileData, setProfileData] = useState<MockProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProfileData(slug);
        setProfileData(data);
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="min-h-screen flex items-center justify-center">No profile data found.</div>;
  }

  return <ProfileDisplay username={slug} initialData={profileData} />;
} 