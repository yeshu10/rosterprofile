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
}

export default function ProfileSidebar({
  basicInfo,
  username,
  onMenuItemClick,
  isOpenToWork = false,
  subscribers,
  verifiedDate,
}: ProfileSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("about");

  const handleMenuItemClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuItemClick(menu);
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <ProfileHeader
        basicInfo={basicInfo}
        username={username}
        isOpenToWork={isOpenToWork}
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