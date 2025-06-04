"use client";

import type { BasicInfo } from '@/types';
import { useState } from 'react';

interface ProfileDetailsProps {
  myDetails: BasicInfo['myDetails'];
}

export default function ProfileDetails({ myDetails }: ProfileDetailsProps) {
  const [showAllDetails, setShowAllDetails] = useState(false);

  const toggleShowAllDetails = () => {
    setShowAllDetails(prev => !prev);
  };

  return (
    <div id="details" className="mt-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
      {myDetails && (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {/* Always visible details */}
          {myDetails.availability && <p><span className="font-medium">Availability:</span> {myDetails.availability}</p>}

          {myDetails.jobTypes && myDetails.jobTypes.length > 0 && (
            <div id="jobtype">
              <span className="font-medium block mb-2">Job Types:</span>
              <div className="flex flex-wrap gap-2">
                {myDetails.jobTypes.map(type => (
                  <span key={type} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {myDetails.contentVerticals && myDetails.contentVerticals.length > 0 && (
            <div id="content">
              <span className="font-medium block mb-2">Content Verticals:</span>
              <div className="flex flex-wrap gap-2">
                {myDetails.contentVerticals.map(vertical => (
                  <span key={vertical} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    {vertical}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Collapsible details */}
          {showAllDetails && (
            <div className="space-y-4">
              {myDetails.platformSpecialty && myDetails.platformSpecialty.length > 0 && (
                <div>
                  <span className="font-medium block mb-2">Platform Specialty:</span>
                  <div className="flex flex-wrap gap-2">
                    {myDetails.platformSpecialty.map(specialty => (
                      <span key={specialty} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {myDetails.skills && myDetails.skills.length > 0 && (
                <div>
                  <span className="font-medium block mb-2">Skills:</span>
                  <div className="flex flex-wrap gap-2">
                    {myDetails.skills.map(skill => (
                      <span key={skill} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {myDetails.software && myDetails.software.length > 0 && (
                <div>
                  <span className="font-medium block mb-2">Softwares:</span>
                  <div className="flex flex-wrap gap-2">
                    {myDetails.software.map(software => (
                      <span key={software} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        {software}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {myDetails.languages && myDetails.languages.length > 0 && (
                <div>
                  <span className="font-medium block mb-2">Languages:</span>
                  <div className="flex flex-wrap gap-2">
                    {myDetails.languages.map(language => (
                      <span key={language} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={toggleShowAllDetails}
            className="text-blue-600 dark:text-blue-400 hover:underline mt-4"
          >
            {showAllDetails ? 'Show less' : 'See all'}
          </button>
        </div>
      )}
    </div>
  );
} 