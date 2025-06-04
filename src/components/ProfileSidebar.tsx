"use client";

// import { useState } from "react"; // Remove local state if not needed
import type { BasicInfo, PortfolioData } from '@/types'; // Keep for type definitions
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileMenu from './ProfileMenu';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'; // Import typed hooks
import { updateBasicInfo } from '@/lib/profileSlice'; // Import action
import { setActiveMenu } from '@/lib/uiSlice';
import type { RootState } from '@/lib/store';

interface ProfileSidebarProps {
  // Remove props that will be read from Redux
  // basicInfo: BasicInfo;
  username: string;
  onMenuItemClick: (menu: string) => void;
  // isOpenToWork?: boolean;
  // subscribers?: number;
  // verifiedDate?: string;
  // onUpdateBasicInfo?: (updatedInfo: BasicInfo) => void;
}

export default function ProfileSidebar({
  // Remove props that will be read from Redux
  // basicInfo,
  username,
  onMenuItemClick,
  // isOpenToWork = false,
  // subscribers,
  // verifiedDate,
  // onUpdateBasicInfo,
}: ProfileSidebarProps) {
  // Remove local state if not needed
  // const [activeMenu, setActiveMenu] = useState("about");

  // Use typed selector to access state from Redux
  const profileData = useAppSelector((state: RootState) => state.profile.profileData);
  const { isProjectsModalOpen } = useAppSelector((state: RootState) => state.modal);
  const { activeMenu } = useAppSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch(); // Use typed dispatch

  const handleMenuItemClick = (menu: string) => {
    dispatch(setActiveMenu(menu));
    onMenuItemClick(menu);
  };

  const handleUpdateProfileImage = (imageUrl: string) => {
    if (profileData?.basicInfo) {
      dispatch(updateBasicInfo({ // Dispatch action to update basicInfo in Redux
        ...profileData.basicInfo,
        profileImage: imageUrl
      }));
    }
  };

  // Render null or loading state if basicInfo is not available yet
  if (!profileData?.basicInfo) {
      return null; // Or a loading spinner
  }

  return (
    <div className="bg-white text-gray-900 rounded-lg shadow p-6">
      <ProfileHeader
        basicInfo={profileData.basicInfo}
        username={username}
        isOpenToWork={profileData.isAvailable}
      />

      <ProfileStats
        location={profileData.basicInfo.location} // Get from Redux state
        subscribers={profileData.followerCount} // Get from Redux state
        verifiedDate={profileData.verifiedDate} // Get from Redux state
      />

      <ProfileMenu
        activeMenu={isProjectsModalOpen ? 'projects' : activeMenu}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
} 