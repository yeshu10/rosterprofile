"use client";

import type { BasicInfo } from '@/types';

interface ProfileDetailsProps {
  myDetails: BasicInfo['myDetails'];
}

export default function ProfileDetails({ myDetails }: ProfileDetailsProps) {
  return (
    <div id="details" className="mt-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
      {myDetails && (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {myDetails.availability && <p><span className="font-medium">Availability:</span> {myDetails.availability}</p>}
          {myDetails.jobTypes && myDetails.jobTypes.length > 0 && <p><span className="font-medium">Job Types:</span> {myDetails.jobTypes.join(", ")}</p>}

          {myDetails.videoEditor && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Video Editor</h4>
              {myDetails.videoEditor.experienceLevel && <p><span className="font-medium">Experience Level:</span> {myDetails.videoEditor.experienceLevel}</p>}
              {myDetails.videoEditor.tools && myDetails.videoEditor.tools.length > 0 && <p><span className="font-medium">Tools:</span> {myDetails.videoEditor.tools.join(", ")}</p>}
            </div>
          )}

          {myDetails.contentVerticals && myDetails.contentVerticals.length > 0 && <p><span className="font-medium">Content Verticals:</span> {myDetails.contentVerticals.join(", ")}</p>}
          {myDetails.platformSpecialty && myDetails.platformSpecialty.length > 0 && <p><span className="font-medium">Platform Specialty:</span> {myDetails.platformSpecialty.join(", ")}</p>}
          {/* Skills, Software, Languages will be handled in ProfileSkills component */}
          {/* {myDetails.skills && myDetails.skills.length > 0 && <p><span className="font-medium">Skills:</span> {myDetails.skills.join(", ")}</p>} */}
          {/* {myDetails.software && myDetails.software.length > 0 && <p><span className="font-medium">Software:</span> {myDetails.software.join(", ")}</p>} */}
          {/* {myDetails.languages && myDetails.languages.length > 0 && <p><span className="font-medium">Languages:</span> {myDetails.languages.join(", ")}</p>} */}
        </div>
      )}
    </div>
  );
} 