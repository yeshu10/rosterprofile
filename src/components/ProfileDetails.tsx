"use client";

import type { BasicInfo } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface ProfileDetailsProps {
  myDetails: BasicInfo['myDetails'];
  onUpdateDetails?: (updatedDetails: BasicInfo['myDetails']) => void;
}

export default function ProfileDetails({ myDetails, onUpdateDetails }: ProfileDetailsProps) {
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [isEditingJobTypes, setIsEditingJobTypes] = useState(false);
  const [newJobType, setNewJobType] = useState('');
  const jobTypesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (jobTypesRef.current && !jobTypesRef.current.contains(event.target as Node)) {
        setIsEditingJobTypes(false);
      }
    };

    if (isEditingJobTypes) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingJobTypes]);

  const toggleShowAllDetails = () => {
    setShowAllDetails(prev => !prev);
  };

  const handleAddJobType = () => {
    if (newJobType.trim() && onUpdateDetails) {
      const updatedJobTypes = [...(myDetails.jobTypes || []), newJobType.trim()];
      onUpdateDetails({
        ...myDetails,
        jobTypes: updatedJobTypes
      });
      setNewJobType('');
    }
  };

  const handleRemoveJobType = (typeToRemove: string) => {
    if (onUpdateDetails) {
      const updatedJobTypes = (myDetails.jobTypes || []).filter(type => type !== typeToRemove);
      onUpdateDetails({
        ...myDetails,
        jobTypes: updatedJobTypes
      });
    }
  };

  return (
    <div id="details" className="mt-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
      {myDetails && (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {/* Always visible details */}
          {myDetails.availability && <p><span className="font-medium">Availability:</span> {myDetails.availability}</p>}

          {myDetails.jobTypes && myDetails.jobTypes.length > 0 && (
            <div id="jobtype" ref={jobTypesRef}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Job Types:</span>
                <button
                  onClick={() => setIsEditingJobTypes(!isEditingJobTypes)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {myDetails.jobTypes.map(type => (
                  <div key={type} className="relative group">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                      {type}
                    </span>
                    {isEditingJobTypes && (
                      <button
                        onClick={() => handleRemoveJobType(type)}
                        className="absolute -top-1 -right-1 bg-gray-200 text-gray-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditingJobTypes && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddJobType();
                      }
                    }}
                    placeholder="Add new job type"
                    className="flex-grow max-w-xs rounded-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <button
                    onClick={handleAddJobType}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </div>
              )}
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