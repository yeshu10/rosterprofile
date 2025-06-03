"use client";

import type { BasicInfo } from '@/types';

interface ProfileAboutProps {
  basicInfo: BasicInfo;
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  const { email, location, socialLinks, intro, aboutMe } = basicInfo;

  return (
    <div id="about">
      {/* About Me */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 mb-4">{intro}</p>
      {aboutMe && <p className="text-gray-700 mb-6">{aboutMe}</p>}

      {/* Contact & Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Location:</span> {location}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Links</h3>
          <div className="space-y-2 text-gray-600">
            {socialLinks?.github && (
              <p>
                <span className="font-medium">GitHub:</span>{' '}
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {socialLinks.github.split('/').pop()}
                </a>
              </p>
            )}
            {socialLinks?.linkedin && (
              <p>
                <span className="font-medium">LinkedIn:</span>{' '}
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {socialLinks.linkedin.split('/').pop()}
                </a>
              </p>
            )}
             {socialLinks?.twitter && (
              <p>
                <span className="font-medium">Twitter:</span>{' '}
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {socialLinks.twitter.split('/').pop()}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
