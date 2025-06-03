"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { PortfolioData } from '@/types';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileAbout from '@/components/ProfileAbout';
import ProfileExperience from '@/components/ProfileExperience';

export default function ProfilePage() {
  const params = useParams();
  const [profileData, setProfileData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Call the mock API endpoint
        const response = await fetch(`/api/portfolio/parse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: `https://example.com/${params.username}` }),
        });

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.message || 'Failed to load profile');
        }

        setProfileData(result.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <ProfileSidebar
              basicInfo={profileData.basicInfo}
              username={profileData.username}
              onMenuItemClick={(menu) => console.log('Menu clicked:', menu)}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <ProfileAbout basicInfo={profileData.basicInfo} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <ProfileExperience employers={profileData.experience} />
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 