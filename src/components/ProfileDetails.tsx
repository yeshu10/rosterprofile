"use client";

import { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { updateMyDetails } from '@/lib/profileSlice';



const AVAILABILITY_OPTIONS = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Available for hire',
  'Not available',
  'Available for projects',
  'Available for consultations',
  'Available for mentoring',
  'Available for speaking',
  'Available for workshops',
  'Available for training',
  'Available for collaborations',
  'Available for partnerships',
  'Available for advisory',
  'Available for board positions',
  'Available for remote work',
  'Available for on-site work',
  'Available for hybrid work',
  'Available for short-term projects',
  'Available for long-term projects',
  'Available for emergency projects',
  'Available for weekend work',
  'Available for evening work',
  'Available for early morning work',
  'Available for international projects',
  'Available for local projects',
  'Available for startup projects',
  'Available for enterprise projects',
  'Available for non-profit projects'
];

export default function ProfileDetails() {
  const [showAll, setShowAll] = useState(false);
  const [isEditingJobTypes, setIsEditingJobTypes] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingPlatform, setIsEditingPlatform] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingSoftware, setIsEditingSoftware] = useState(false);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  
  const [newJobType, setNewJobType] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPlatform, setNewPlatform] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newSoftware, setNewSoftware] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const jobTypesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const softwareRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);

  // Use typed selector to access myDetails from Redux state
  const myDetails = useAppSelector(state => state.profile.profileData?.basicInfo?.myDetails);
  const dispatch = useAppDispatch(); // Use typed dispatch

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (jobTypesRef.current && !jobTypesRef.current.contains(event.target as Node)) {
        setIsEditingJobTypes(false);
      }
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsEditingContent(false);
      }
      if (platformRef.current && !platformRef.current.contains(event.target as Node)) {
        setIsEditingPlatform(false);
      }
      if (skillsRef.current && !skillsRef.current.contains(event.target as Node)) {
        setIsEditingSkills(false);
      }
      if (softwareRef.current && !softwareRef.current.contains(event.target as Node)) {
        setIsEditingSoftware(false);
      }
      if (languagesRef.current && !languagesRef.current.contains(event.target as Node)) {
        setIsEditingLanguages(false);
      }
      if (availabilityRef.current && !availabilityRef.current.contains(event.target as Node)) {
        setIsEditingAvailability(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update handler functions to dispatch actions
  const handleAddJobType = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      jobTypes: [...myDetails.jobTypes, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemoveJobType = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      jobTypes: myDetails.jobTypes.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAddContent = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      contentVerticals: [...myDetails.contentVerticals, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemoveContent = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      contentVerticals: myDetails.contentVerticals.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAddPlatform = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      platformSpecialty: [...myDetails.platformSpecialty, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemovePlatform = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      platformSpecialty: myDetails.platformSpecialty.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAddSkill = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      skills: [...myDetails.skills, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemoveSkill = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      skills: myDetails.skills.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAddSoftware = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      software: [...myDetails.software, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemoveSoftware = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      software: myDetails.software.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAddLanguage = (item: string) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      languages: [...myDetails.languages, item]
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleRemoveLanguage = (index: number) => {
    if (!myDetails) return;
    const updatedDetails = {
      ...myDetails,
      languages: myDetails.languages.filter((_, i) => i !== index)
    };
    dispatch(updateMyDetails(updatedDetails));
  };

  const handleAvailabilityChange = (value: string) => {
    if (!myDetails) return; // Added null check
    const updatedDetails = {
      ...myDetails,
      availability: value
    };
    dispatch(updateMyDetails(updatedDetails));
    setIsEditingAvailability(false);
  };

  const renderEditableSection = (
    title: string,
    items: string[],
    colorClasses: { bg: string; text: string },
    onAdd: (item: string) => void,
    onRemove: (index: number) => void,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
    newItem: string,
    setNewItem: (value: string) => void,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
        <div ref={ref} className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${colorClasses.bg} ${colorClasses.text} px-3 py-1 rounded-full text-sm flex items-center group`}
            >
              {item}
              {isEditing && (
                <button
                  onClick={() => onRemove(index)}
                  className="ml-2 text-gray-600 hover:text-gray-800 transition-opacity hover:bg-gray-300"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newItem.trim()) {
                      onAdd(newItem.trim());
                      setNewItem('');
                    }
                  }
                }}
                placeholder={`Add ${title.toLowerCase()}`}
                className="flex-grow max-w-xs rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={() => {
                  if (newItem.trim()) {
                    onAdd(newItem.trim());
                    setNewItem('');
                  }
                }}
                className="bg-blue-500 text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render null or loading state if myDetails is not available yet
  if (!myDetails) {
      return null; // Or a loading spinner
  }

  return (
    <div id="details" className="mt-8 bg-white text-gray-900 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">My Details</h2>
      <div className="space-y-4 text-gray-700">
        {/* Availability */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
            <button
              onClick={() => setIsEditingAvailability(!isEditingAvailability)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isEditingAvailability ? 'Done' : 'Edit'}
            </button>
          </div>
          <div ref={availabilityRef} className="relative">
            {isEditingAvailability ? (
              <select
                value={myDetails.availability}
                onChange={(e) => handleAvailabilityChange(e.target.value)}
                className="w-64 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                {AVAILABILITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-gray-700">{myDetails.availability}</div>
            )}
          </div>
        </div>

        {/* Job Types */}
        <div id="jobtype" className="mb-6">
          {renderEditableSection(
            'Job Types',
            myDetails.jobTypes,
            {
              bg: 'bg-blue-50',
              text: 'text-blue-700'
            },
            handleAddJobType,
            handleRemoveJobType,
            isEditingJobTypes,
            setIsEditingJobTypes,
            newJobType,
            setNewJobType,
            jobTypesRef
          )}
        </div>

        {/* Content Verticals */}
        <div id="content" className="mb-6">
          {renderEditableSection(
            'Content Verticals',
            myDetails.contentVerticals,
            {
              bg: 'bg-green-50',
              text: 'text-green-700'
            },
            handleAddContent,
            handleRemoveContent,
            isEditingContent,
            setIsEditingContent,
            newContent,
            setNewContent,
            contentRef
          )}
        </div>

        {/* See All Toggle Button - Only show when not expanded */}
        {!showAll && (
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              See All Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Additional sections - Only visible when showAll is true */}
        {showAll && (
          <>
            {/* Platform Specialty */}
            {renderEditableSection(
              'Platform Specialty',
              myDetails.platformSpecialty,
              {
                bg: 'bg-purple-50',
                text: 'text-purple-700'
              },
              handleAddPlatform,
              handleRemovePlatform,
              isEditingPlatform,
              setIsEditingPlatform,
              newPlatform,
              setNewPlatform,
              platformRef
            )}

            {/* Skills */}
            {renderEditableSection(
              'Skills',
              myDetails.skills,
              {
                bg: 'bg-yellow-50',
                text: 'text-yellow-700'
              },
              handleAddSkill,
              handleRemoveSkill,
              isEditingSkills,
              setIsEditingSkills,
              newSkill,
              setNewSkill,
              skillsRef
            )}

            {/* Software */}
            {renderEditableSection(
              'Software',
              myDetails.software,
              {
                bg: 'bg-red-50',
                text: 'text-red-700'
              },
              handleAddSoftware,
              handleRemoveSoftware,
              isEditingSoftware,
              setIsEditingSoftware,
              newSoftware,
              setNewSoftware,
              softwareRef
            )}

            {/* Languages */}
            {renderEditableSection(
              'Languages',
              myDetails.languages,
              {
                bg: 'bg-indigo-50',
                text: 'text-indigo-700'
              },
              handleAddLanguage,
              handleRemoveLanguage,
              isEditingLanguages,
              setIsEditingLanguages,
              newLanguage,
              setNewLanguage,
              languagesRef
            )}

            {/* Show Less Button - At the end when expanded */}
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setShowAll(false)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                Show Less
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 