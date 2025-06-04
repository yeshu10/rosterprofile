"use client";

import type { BasicInfo } from '@/types';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface ProfileHeaderProps {
  basicInfo: BasicInfo;
  username: string;
  isOpenToWork?: boolean;
  onUpdateProfileImage?: (imageUrl: string) => void;
}

export default function ProfileHeader({ basicInfo, username, isOpenToWork = false, onUpdateProfileImage }: ProfileHeaderProps) {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!isEditingImage) {
      setIsEditingImage(true);
    }
  };

  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpdateProfileImage) {
      const imageUrl = URL.createObjectURL(file);
      onUpdateProfileImage(imageUrl);
      setIsEditingImage(false);
    } else if (isEditingImage) {
      // If editing but no file selected (e.g., clicked cancel area or outside file dialog)
      setIsEditingImage(false);
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingImage(false);
  };

  // Add a click handler to the outer div to exit editing mode if clicked outside buttons
  const handleOuterClick = (e: React.MouseEvent) => {
    if (isEditingImage && e.target === e.currentTarget) {
        setIsEditingImage(false);
    }
  };

  return (
    <div className="text-center mb-6">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div 
          className="w-32 h-32 rounded-full overflow-hidden cursor-pointer group relative"
          onClick={handleImageClick}
          onKeyDown={(e) => { // Added keyboard support for accessibility
              if (e.key === 'Enter' || e.key === ' ') handleImageClick();
          }}
          role="button" // Indicate it's interactive
          tabIndex={0} // Make it focusable
        >
          <Image
            src={basicInfo.profileImage || `https://i.pravatar.cc/150?u=${username}`}
            alt={basicInfo.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
          {isEditingImage ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <div className="flex gap-2">
                <button
                  onClick={handleCameraClick}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                  aria-label="Select new profile image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {/* Added Cancel button for explicit exit from edit mode */}
                 <button
                  onClick={handleCancelEdit}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                  aria-label="Cancel image edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{basicInfo.name}</h1>
      <p className="text-gray-600">{basicInfo.title}</p>
      {isOpenToWork && (
        <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition">
          Open to work
        </button>
      )}
    </div>
  );
}