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
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingPlatform, setIsEditingPlatform] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingSoftware, setIsEditingSoftware] = useState(false);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleShowAllDetails = () => {
    setShowAllDetails(prev => !prev);
  };

  const handleAddItem = (type: string, value: string) => {
    if (value.trim() && onUpdateDetails) {
      const updatedDetails = { ...myDetails };
      switch (type) {
        case 'jobType':
          updatedDetails.jobTypes = [...(myDetails.jobTypes || []), value.trim()];
          setNewJobType('');
          break;
        case 'content':
          updatedDetails.contentVerticals = [...(myDetails.contentVerticals || []), value.trim()];
          setNewContent('');
          break;
        case 'platform':
          updatedDetails.platformSpecialty = [...(myDetails.platformSpecialty || []), value.trim()];
          setNewPlatform('');
          break;
        case 'skill':
          updatedDetails.skills = [...(myDetails.skills || []), value.trim()];
          setNewSkill('');
          break;
        case 'software':
          updatedDetails.software = [...(myDetails.software || []), value.trim()];
          setNewSoftware('');
          break;
        case 'language':
          updatedDetails.languages = [...(myDetails.languages || []), value.trim()];
          setNewLanguage('');
          break;
      }
      onUpdateDetails(updatedDetails);
    }
  };

  const handleRemoveItem = (type: string, valueToRemove: string) => {
    if (onUpdateDetails) {
      const updatedDetails = { ...myDetails };
      switch (type) {
        case 'jobType':
          updatedDetails.jobTypes = (myDetails.jobTypes || []).filter(item => item !== valueToRemove);
          break;
        case 'content':
          updatedDetails.contentVerticals = (myDetails.contentVerticals || []).filter(item => item !== valueToRemove);
          break;
        case 'platform':
          updatedDetails.platformSpecialty = (myDetails.platformSpecialty || []).filter(item => item !== valueToRemove);
          break;
        case 'skill':
          updatedDetails.skills = (myDetails.skills || []).filter(item => item !== valueToRemove);
          break;
        case 'software':
          updatedDetails.software = (myDetails.software || []).filter(item => item !== valueToRemove);
          break;
        case 'language':
          updatedDetails.languages = (myDetails.languages || []).filter(item => item !== valueToRemove);
          break;
      }
      onUpdateDetails(updatedDetails);
    }
  };

  const renderEditableSection = (
    title: string,
    items: string[] | undefined,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
    newValue: string,
    setNewValue: (value: string) => void,
    type: string,
    ref: React.RefObject<HTMLDivElement | null>,
    bgColor: string,
    textColor: string
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div ref={ref}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{title}:</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <div key={item} className="relative group">
              <span className={`${bgColor} ${textColor} text-xs font-medium px-2 py-0.5 rounded-full`}>
                {item}
              </span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveItem(type, item)}
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
        {isEditing && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem(type, newValue);
                }
              }}
              placeholder={`Add new ${title.toLowerCase()}`}
              className="flex-grow max-w-xs rounded-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            />
            <button
              onClick={() => handleAddItem(type, newValue)}
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
    );
  };

  return (
    <div id="details" className="mt-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
      {myDetails && (
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {/* Always visible details */}
          {myDetails.availability && <p><span className="font-medium">Availability:</span> {myDetails.availability}</p>}

          {/* Job Types */}
          {renderEditableSection(
            'Job Types',
            myDetails.jobTypes,
            isEditingJobTypes,
            setIsEditingJobTypes,
            newJobType,
            setNewJobType,
            'jobType',
            jobTypesRef,
            'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
            'text-blue-700 dark:text-blue-300'
          )}

          {/* Content Verticals */}
          {renderEditableSection(
            'Content Verticals',
            myDetails.contentVerticals,
            isEditingContent,
            setIsEditingContent,
            newContent,
            setNewContent,
            'content',
            contentRef,
            'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
            'text-green-700 dark:text-green-300'
          )}

          {/* Collapsible details */}
          {showAllDetails && (
            <div className="space-y-4">
              {/* Platform Specialty */}
              {renderEditableSection(
                'Platform Specialty',
                myDetails.platformSpecialty,
                isEditingPlatform,
                setIsEditingPlatform,
                newPlatform,
                setNewPlatform,
                'platform',
                platformRef,
                'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                'text-purple-700 dark:text-purple-300'
              )}

              {/* Skills */}
              {renderEditableSection(
                'Skills',
                myDetails.skills,
                isEditingSkills,
                setIsEditingSkills,
                newSkill,
                setNewSkill,
                'skill',
                skillsRef,
                'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
                'text-yellow-700 dark:text-yellow-300'
              )}

              {/* Software */}
              {renderEditableSection(
                'Softwares',
                myDetails.software,
                isEditingSoftware,
                setIsEditingSoftware,
                newSoftware,
                setNewSoftware,
                'software',
                softwareRef,
                'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                'text-red-700 dark:text-red-300'
              )}

              {/* Languages */}
              {renderEditableSection(
                'Languages',
                myDetails.languages,
                isEditingLanguages,
                setIsEditingLanguages,
                newLanguage,
                setNewLanguage,
                'language',
                languagesRef,
                'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
                'text-indigo-700 dark:text-indigo-300'
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