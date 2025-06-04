"use client";

import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileMenu from './ProfileMenu';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'; 
import { setActiveMenu } from '@/lib/uiSlice';
import type { RootState } from '@/lib/store';

interface ProfileSidebarProps {
  username: string;
  onMenuItemClick: (menu: string) => void;
}

export default function ProfileSidebar({ 

  onMenuItemClick,
  
}: ProfileSidebarProps) {
 
  const profileData = useAppSelector((state: RootState) => state.profile.profileData);
  const { isProjectsModalOpen } = useAppSelector((state: RootState) => state.modal);
  const { activeMenu } = useAppSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch(); 

  const handleMenuItemClick = (menu: string) => {
    dispatch(setActiveMenu(menu));
    onMenuItemClick(menu);
  };



  if (!profileData?.basicInfo) {
      return null; // Or a loading spinner
  }

  return (
    <div className="bg-white text-gray-900 rounded-lg shadow p-6">
      <ProfileHeader />

      <ProfileStats
        location={profileData.basicInfo.location} 
        subscribers={profileData.followerCount} 
        verifiedDate={profileData.verifiedDate} 
      />

      <ProfileMenu
        activeMenu={isProjectsModalOpen ? 'projects' : activeMenu}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
} 