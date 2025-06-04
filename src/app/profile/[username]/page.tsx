"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setProfileData, setLoading, setError, updateBasicInfo } from '@/lib/profileSlice';

import { RootState } from '@/lib/store';

import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileAbout from "@/components/ProfileAbout";
import ProfileExperience from "@/components/ProfileExperience";
import ProfileDetails from "@/components/ProfileDetails";
import ProjectsModal from "@/components/modals/ProjectsModal";
import ProjectDetailModal from "@/components/modals/ProjectDetailModal";
import EmployerModal from "@/components/modals/EmployerModal";
import type { BasicInfo} from '@/types';

export default function ProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();

  // Access state directly from useAppSelector and destructure
  const { profileData, loading, error } = useAppSelector((state: RootState) => state.profile);


  useEffect(() => {
    const fetchProfileData = async () => {
      dispatch(setLoading(true));
      try {
        // Replace with your actual API call
        const res = await fetch(`/api/portfolio/parse?username=${username}`);
        const data = await res.json();
        if (data.success) {
          dispatch(setProfileData(data.data));
        } else {
          dispatch(setError(data.message || 'Failed to fetch profile data'));
        }
      } catch (err: any) {
        dispatch(setError(err.message || 'An error occurred'));
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username, dispatch]);

  // Function to handle menu item click and scroll
  const handleMenuItemClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const handleUpdateBasicInfo = (updatedInfo: BasicInfo) => {
      dispatch(updateBasicInfo(updatedInfo));
  };

 

  if (loading) {
    return <div className="text-center mt-8 text-gray-900">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="text-center mt-8 text-gray-900">Profile not found.</div>;
  }

  // Destructure from profileData after null check
  const { basicInfo, experience, isAvailable, followerCount, verifiedDate } = profileData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileSidebar
            username={username as string}
            onMenuItemClick={handleMenuItemClick}
            isOpenToWork={isAvailable}
            subscribers={followerCount}
            verifiedDate={verifiedDate}
            onUpdateBasicInfo={handleUpdateBasicInfo}
          />
        </div>
        <div className="md:col-span-2">
          <ProfileAbout  />

          <ProfileExperience
            employers={experience}
         
          />

          {basicInfo.myDetails && (
            <ProfileDetails   />
          )}
        </div>
      </div>

      <ProjectsModal />
      <ProjectDetailModal />
      <EmployerModal />
    </div>
  );
}
