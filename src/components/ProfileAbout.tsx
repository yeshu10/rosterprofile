"use client";

import type { BasicInfo } from '@/types';

interface ProfileAboutProps {
  basicInfo: {
    intro: string;
    aboutMe?: string;
  };
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  const { intro, aboutMe } = basicInfo;

  return (
    <div id="about" className="bg-white text-gray-900 rounded-lg shadow p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-700 mb-4">{intro}</p>
        {aboutMe && <p className="text-gray-700 mb-6">{aboutMe}</p>}
      </div>
    </div>
  );
}
