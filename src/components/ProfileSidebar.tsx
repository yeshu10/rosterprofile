"use client";

import { useState } from "react";
import type { BasicInfo } from '@/types';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileMenu from './ProfileMenu';

interface ProfileSidebarProps {
  basicInfo: BasicInfo;
  username: string;
  onMenuItemClick: (menu: string) => void;
  isOpenToWork?: boolean;
  subscribers?: number;
  verifiedDate?: string;
  onUpdateBasicInfo?: (updatedInfo: BasicInfo) => void;
}

export default function ProfileSidebar({
  basicInfo,
  username,
  onMenuItemClick,
  isOpenToWork = false,
  subscribers,
  verifiedDate,
  onUpdateBasicInfo,
}: ProfileSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("about");

  const handleMenuItemClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuItemClick(menu);
  };

  const handleUpdateProfileImage = (imageUrl: string) => {
    if (onUpdateBasicInfo) {
      onUpdateBasicInfo({
        ...basicInfo,
        profileImage: imageUrl
      });
    }
  };

  return (
    <div className="bg-white text-gray-900 rounded-lg shadow p-6">
      <ProfileHeader
        basicInfo={basicInfo}
        username={username}
        isOpenToWork={isOpenToWork}
        onUpdateProfileImage={handleUpdateProfileImage}
      />

      <ProfileStats
        location={basicInfo.location}
        subscribers={subscribers}
        verifiedDate={verifiedDate}
      />

      <ProfileMenu
        activeMenu={activeMenu}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
} 