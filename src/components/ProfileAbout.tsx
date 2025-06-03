"use client";

import type { BasicInfo } from '@/types';

interface ProfileAboutProps {
  basicInfo: BasicInfo;
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About me</h2>
      <p className="text-gray-700 mb-6">{basicInfo.intro}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {basicInfo.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Location:</span> {basicInfo.location}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Links</h3>
          <div className="space-y-2">
            {basicInfo.socialLinks.github && (
              <p className="text-gray-600">
                <span className="font-medium">GitHub:</span>{' '}
                <a href={basicInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {basicInfo.socialLinks.github.split('/').pop()}
                </a>
              </p>
            )}
            {basicInfo.socialLinks.linkedin && (
              <p className="text-gray-600">
                <span className="font-medium">LinkedIn:</span>{' '}
                <a href={basicInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {basicInfo.socialLinks.linkedin.split('/').pop()}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 