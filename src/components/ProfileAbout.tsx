"use client";

import { BasicInfo } from "@/utils/mockApi";

interface ProfileAboutProps {
  basicInfo: BasicInfo;
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About me</h2>
      <p className="text-gray-700">{basicInfo.intro}</p>
    </div>
  );
} 