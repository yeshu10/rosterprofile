"use client";

import type { BasicInfo } from "@/types";

interface ProfileAboutProps {
  basicInfo: BasicInfo;
}

export default function ProfileAbout({ basicInfo }: ProfileAboutProps) {
  const { email, location, socialLinks, intro, aboutMe, myDetails } = basicInfo;

  return (
    <div>
      {/* About Me */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 mb-4">{intro}</p>
      <p className="text-gray-700 mb-6">{aboutMe}</p>

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
            {socialLinks.github && (
              <p>
                <span className="font-medium">GitHub:</span>{' '}
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {socialLinks.github.split('/').pop()}
                </a>
              </p>
            )}
            {socialLinks.linkedin && (
              <p>
                <span className="font-medium">LinkedIn:</span>{' '}
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {socialLinks.linkedin.split('/').pop()}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* My Details Section */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">My Details</h3>
      <div className="space-y-4 text-gray-700">
        <p><span className="font-medium">Availability:</span> {myDetails.availability}</p>
        <p><span className="font-medium">Job Types:</span> {myDetails.jobTypes.join(", ")}</p>

        <div>
          <h4 className="font-semibold">Video Editor</h4>
          <p><span className="font-medium">Experience Level:</span> {myDetails.videoEditor.experienceLevel}</p>
          <p><span className="font-medium">Tools:</span> {myDetails.videoEditor.tools.join(", ")}</p>
        </div>

        <p><span className="font-medium">Content Verticals:</span> {myDetails.contentVerticals.join(", ")}</p>
        <p><span className="font-medium">Platform Specialty:</span> {myDetails.platformSpecialty.join(", ")}</p>
        <p><span className="font-medium">Skills:</span> {myDetails.skills.join(", ")}</p>
        <p><span className="font-medium">Software:</span> {myDetails.software.join(", ")}</p>
        <p><span className="font-medium">Languages:</span> {myDetails.languages.join(", ")}</p>
      </div>
    </div>
  );
}
