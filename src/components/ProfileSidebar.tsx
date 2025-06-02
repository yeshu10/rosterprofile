"use client";

import Image from "next/image";
import { BasicInfo } from "@/utils/mockApi";
import { useState } from "react";

interface ProfileSidebarProps {
  basicInfo: BasicInfo;
  username: string;
  onMenuItemClick: (section: string) => void;
}

export default function ProfileSidebar({
  basicInfo,
  username,
  onMenuItemClick,
}: ProfileSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("about");

  const handleMenuItemClick = (section: string) => {
    setActiveMenu(section);
    onMenuItemClick(section);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Profile Image and Basic Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={`https://i.pravatar.cc/150?u=${username}`}
            alt={`${basicInfo.firstName} ${basicInfo.lastName}`}
            width={96}
            height={96}
            className="rounded-full object-cover w-24 h-24"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {basicInfo.firstName} {basicInfo.lastName}
        </h2>
        <p className="text-gray-600 text-sm">Video Editor</p> {/* Placeholder Title */}
        <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition">
          Open to work
        </button>
      </div>

      {/* Location and Verification (Placeholder) */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="flex items-center text-gray-600 text-sm mb-2">
          {/* Placeholder Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Verified Jan 19, 2024
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          {/* Placeholder Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Los Angeles, United States
        </div>
         <div className="flex items-center text-gray-600 text-sm mt-2">
          {/* Placeholder Icon */}
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.503 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.497 6.997 21 6.375 21H4.125C3.503 21 3 20.497 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.497 3 21 3.503 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
           LankyBox (41.1M Subscribers) {/* Placeholder Data */}
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
          {/* Add more menu items here */} 
        </ul>
      </div>
    </div>
  );
} 