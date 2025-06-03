"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileAbout from '@/components/ProfileAbout';
import ProfileExperience from '@/components/ProfileExperience';
import ProfileDetails from '@/components/ProfileDetails';
import ProfileSkills from '@/components/ProfileSkills';
import type { PortfolioData, PortfolioParseResponse } from '@/types';
import { mockProjects } from '@/data/mockProjects';
import ProjectsModal from '@/components/modals/ProjectsModal';

export default function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Call the local mock API endpoint
        const response = await fetch('/api/portfolio/parse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: `mockdata/${username}` }), // Use a mock URL format
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const result: PortfolioParseResponse = await response.json();
        
        if (!result.success || !result.data) {
          throw new Error(result.message || 'Failed to load profile data');
        }

        setProfileData(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  // Function to handle menu item click and scroll
  const handleMenuItemClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle projects modal
  const handleViewProjects = () => {
    setIsProjectsModalOpen(true);
  };

  const handleCloseProjectsModal = () => {
    setIsProjectsModalOpen(false);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="text-center mt-8">Profile not found.</div>;
  }

  // Destructure for easier access
  const { basicInfo, experience, isAvailable, followerCount, verifiedDate } = profileData;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <ProfileSidebar
            basicInfo={basicInfo}
            username={username as string}
            onMenuItemClick={handleMenuItemClick}
            isOpenToWork={isAvailable}
            subscribers={followerCount}
            verifiedDate={verifiedDate}
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* About Section */}
          <ProfileAbout basicInfo={basicInfo} />

          {/* Experience Section */}
          <ProfileExperience
            employers={experience}
            onViewProjects={handleViewProjects}
          />

          {/* My Details Section */}
          {basicInfo.myDetails && <ProfileDetails myDetails={basicInfo.myDetails} />}

          {/* Skills Section */}
          {basicInfo.myDetails?.skills && basicInfo.myDetails.skills.length > 0 && <ProfileSkills skills={basicInfo.myDetails.skills} />}

          {/* Projects Section - Placeholder */}
          <div id="projects" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <p className="text-gray-700">Projects section coming soon...</p>
          </div>

          {/* Content Section - Placeholder */}
          <div id="content" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content</h2>
            <p className="text-gray-700">Content section coming soon...</p>
          </div>
        </div>
      </div>

      {/* Projects Modal */}
      {isProjectsModalOpen && (
        <ProjectsModal
          projects={mockProjects}
          onClose={handleCloseProjectsModal}
        />
      )}
    </div>
  );
} 