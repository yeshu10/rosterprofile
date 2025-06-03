"use client";

import { useState } from 'react';
import type { Experience } from '@/types';

interface ProfileExperienceProps {
  employers: Experience[];
  onViewProjects: () => void; // Handler to open the projects modal
}

export default function ProfileExperience({ employers, onViewProjects }: ProfileExperienceProps) {
  // State to manage toggle for each experience item
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);
  // State to manage search term for each experience's videos
  const [videoSearchTerms, setVideoSearchTerms] = useState<Record<string, string>>({});
  // State to manage sort criteria for each experience's videos
  const [videoSortCriteria, setVideoSortCriteria] = useState<Record<string, string>>({});
  // State to manage filter criteria for each experience's videos
  const [videoFilterCriteria, setVideoFilterCriteria] = useState<Record<string, string>>({});

  const toggleExperience = (id: string) => {
    setOpenExperienceId(openExperienceId === id ? null : id);
  };

  // Handler for per-experience video search input
  const handleVideoSearchChange = (id: string, term: string) => {
    setVideoSearchTerms(prev => ({ ...prev, [id]: term }));
  };

   // Handler for per-experience video sort select
  const handleVideoSortChange = (id: string, criteria: string) => {
    setVideoSortCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  // Handler for per-experience video filter select
  const handleVideoFilterChange = (id: string, criteria: string) => {
    setVideoFilterCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  // Helper to format subscriber count (e.g., 1.1M)
  const formatCount = (count?: number) => {
    if (count === undefined) return '';
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    } else {
      return count.toString();
    }
  };

   const filterAndSortVideos = (videos: string[] | undefined, experienceId: string) => {
     if (!videos) return [];

     const searchTerm = videoSearchTerms[experienceId]?.toLowerCase() || '';
     const sortCriteria = videoSortCriteria[experienceId] || 'default'; // 'default' or other criteria
     const filterCriteria = videoFilterCriteria[experienceId] || 'all'; // 'all' or specific platform

     const filtered = videos.filter(video => video.toLowerCase().includes(searchTerm));

     // Basic filtering by platform (needs more detailed video data to be truly effective)
     if (filterCriteria !== 'all') {
        // This filtering is basic as videos are just strings now.
        // With Project interface for videos, we could filter by video.platform
         // filtered = filtered.filter(video => video.platform?.toLowerCase() === filterCriteria);
     }

     // Sorting (basic sorting, needs more detailed video data)
     if (sortCriteria === 'views') {
         // Needs video objects with a views property to sort
         // filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
     } else if (sortCriteria === 'likes') {
         // Needs video objects with a likes property to sort
         // filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
     }
      // Keep original order if no specific sort
     return filtered;
   };

  return (
    <div id="experience" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My experience ({employers.length})</h2>
        {/* View My Projects Button */}
        <div>
           <button onClick={onViewProjects} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View my projects</button>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {employers.map((employer) => {
          const isExperienceOpen = openExperienceId === employer.id;
          const filteredAndSortedVideos = filterAndSortVideos(employer.videos, employer.id);

          return (
            <div key={employer.id} className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
              {/* Header with Toggle */}
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExperience(employer.id)}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{employer.company}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{employer.position}</p>
                </div>
                {/* Toggle Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 text-gray-500 dark:text-gray-300 transform transition-transform ${isExperienceOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              {/* Collapsible Content */}
              {isExperienceOpen && (
                <div className="mt-4">
                   {/* Search, Sort, Filter for this specific experience's videos */}
                   {employer.videos && employer.videos.length > 0 && (
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center flex-grow mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search videos by title"
                              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                              value={videoSearchTerms[employer.id] || ''}
                              onChange={e => handleVideoSearchChange(employer.id, e.target.value)}
                            />
                          </div>
                          {/* Sort and Filter Placeholders (only if there are videos) */}
                          {employer.videos && employer.videos.length > 0 && (
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <label htmlFor={`sort-${employer.id}`} className="mr-2 text-gray-700 dark:text-gray-300 text-sm">Sort:</label>
                                <select id={`sort-${employer.id}`} className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                                   value={videoSortCriteria[employer.id] || 'default'}
                                   onChange={e => handleVideoSortChange(employer.id, e.target.value)}
                                >
                                  {/* These options are placeholders, actual sorting needs video objects */}
                                  <option value="default">Default</option>
                                  <option value="views">Views</option>
                                  <option value="likes">Likes</option>
                                </select>
                              </div>
                              <div className="flex items-center">
                                <label htmlFor={`filter-${employer.id}`} className="mr-2 text-gray-700 dark:text-gray-300 text-sm">Filter:</label>
                                <select id={`filter-${employer.id}`} className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                                   value={videoFilterCriteria[employer.id] || 'all'}
                                   onChange={e => handleVideoFilterChange(employer.id, e.target.value)}
                                >
                                   <option value="all">All Files</option>
                                   <option value="youtube">Youtube</option>
                                   <option value="instagram">Instagram</option>
                                   <option value="facebook">Facebook</option>
                                   <option value="tiktok">Tiktok</option>
                                </select>
                              </div>
                            </div>
                           )}
                      </div>
                    )}

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                     {employer.type && (
                       <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{employer.type}</span>
                     )}
                     {employer.projects !== undefined && (
                        <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{employer.projects} project{employer.projects !== 1 ? 's' : ''}</span>
                     )}
                      {employer.subscribers !== undefined && (
                        <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{formatCount(employer.subscribers)} Subs</span>
                      )}
                     <span className="ml-auto text-gray-500 dark:text-gray-400">{employer.duration}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{employer.description}</p>

                  {/* Related Videos */}
                  {filteredAndSortedVideos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Related Videos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredAndSortedVideos.map((video, vIndex) => (
                          <span
                            key={vIndex} // Using index as key since video titles might not be unique without Project objects
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm transition-colors duration-300"
                          >
                            {video}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 