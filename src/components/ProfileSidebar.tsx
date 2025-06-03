"use client";

import Image from "next/image";
import { useState } from "react";
import type { BasicInfo } from '@/types';

interface ProfileSidebarProps {
  basicInfo: BasicInfo;
  username: string;
  onMenuItemClick: (menu: string) => void;
}

export default function ProfileSidebar({
  basicInfo,
  username,
  onMenuItemClick,
}: ProfileSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("about");

  const handleMenuItemClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuItemClick(menu);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src={`https://i.pravatar.cc/150?u=${username}`}
            alt={basicInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{basicInfo.name}</h1>
        <p className="text-gray-600">{basicInfo.title}</p>
        <p className="text-gray-500 text-sm mt-1">{basicInfo.location}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">CONTACT INFO</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {basicInfo.email}
          </div>
          {basicInfo.socialLinks.github && (
            <div className="flex items-center text-gray-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <a href={basicInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                GitHub
              </a>
            </div>
          )}
          {basicInfo.socialLinks.linkedin && (
            <div className="flex items-center text-gray-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <a href={basicInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Menu */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">QUICK MENU</h3>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => handleMenuItemClick("about")}
              className={`text-gray-600 hover:text-gray-900 ${activeMenu === "about" ? "font-semibold" : ""}`}
            >
              About
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleMenuItemClick("experience")}
              className={`text-gray-600 hover:text-gray-900 ${activeMenu === "experience" ? "font-semibold" : ""}`}
            >
              Worked With
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
} 