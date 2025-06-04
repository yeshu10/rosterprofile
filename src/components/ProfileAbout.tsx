"use client";

import type { BasicInfo } from '@/types';

interface ProfileAboutProps {
  basicInfo: BasicInfo;
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  const { intro, aboutMe } = basicInfo;

  return (
    <div id="about" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      {/* About Me */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{intro}</p>
      {aboutMe && <p className="text-gray-700 dark:text-gray-300 mb-6">{aboutMe}</p>}

      </div>
  );
}
