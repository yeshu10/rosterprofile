"use client";

import type { BasicInfo } from '@/types';
import Image from 'next/image';

interface ProfileHeaderProps {
  basicInfo: BasicInfo;
  username: string;
  isOpenToWork?: boolean;
}

export default function ProfileHeader({ basicInfo, username, isOpenToWork = false }: ProfileHeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={basicInfo.profileImage || `https://i.pravatar.cc/150?u=${username}`}
            alt={basicInfo.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
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