"use client";

import { useState, useMemo } from 'react';
import type { Experience, Project } from '@/types';
import Image from 'next/image';

interface ProfileExperienceProps {
  employers: Experience[];
  onViewProjects: () => void; // Handler to open the projects modal
}

export default function ProfileExperience({ employers, onViewProjects }: ProfileExperienceProps) {
  // State to manage toggle for each experience item
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);
  // State to manage search term for each experience's projects
  const [projectSearchTerms, setProjectSearchTerms] = useState<Record<string, string>>({});
  // State to manage sort criteria for each experience's projects
  const [projectSortCriteria, setProjectSortCriteria] = useState<Record<string, string>>({});
  // State to manage filter criteria for each experience's projects
  const [projectFilterCriteria, setProjectFilterCriteria] = useState<Record<string, string>>({});
  // State to manage visible projects count for each experience
  const [visibleProjectsCounts, setVisibleProjectsCounts] = useState<Record<string, number>>({});

  const projectsPerRow = 3; // Number of projects to load per row

  // Initialize visible projects count for each experience on mount or when employers change
  useMemo(() => {
    const initialCounts: Record<string, number> = {};
    employers.forEach(employer => {
      initialCounts[employer.id] = projectsPerRow;
    });
    setVisibleProjectsCounts(initialCounts);
  }, [employers]);

  const toggleExperience = (id: string) => {
    setOpenExperienceId(openExperienceId === id ? null : id);
  };

  // Handler for per-experience project search input
  const handleProjectSearchChange = (id: string, term: string) => {
    setProjectSearchTerms(prev => ({ ...prev, [id]: term }));
  };

  // Handler for per-experience project sort select
  const handleProjectSortChange = (id: string, criteria: string) => {
    setProjectSortCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  // Handler for per-experience project filter select
  const handleProjectFilterChange = (id: string, criteria: string) => {
    setProjectFilterCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  // Handler to load more projects for a specific experience
  const handleLoadMoreProjects = (id: string) => {
    setVisibleProjectsCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || projectsPerRow) + projectsPerRow // Increase count by projectsPerRow
    }));
  };

  // Helper to format subscriber/view/like count (e.g., 1.1M)
  const formatCount = (count?: number) => {
    if (count === undefined) return '--';
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    } else {
      return count.toString();
    }
  };

  const filterAndSortProjects = (projects: Project[] | undefined, experienceId: string) => {
    if (!projects) return [];

    const searchTerm = projectSearchTerms[experienceId]?.toLowerCase() || '';
    const sortCriteria = projectSortCriteria[experienceId] || 'default'; // 'default', 'views', 'likes'
    const filterCriteria = projectFilterCriteria[experienceId] || 'all'; // 'all' or specific platform

    let filtered = projects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by platform
    if (filterCriteria !== 'all') {
      filtered = filtered.filter(project => project.platform?.toLowerCase() === filterCriteria);
    }

    // Sorting
    if (sortCriteria === 'views') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortCriteria === 'likes') {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    // Note: Sorting is done in place on a copy of the array

    return filtered;
  };

  return (
    <div id="experience" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My experience ({employers.length})</h2>
        {/* View My Projects Button - Keep for overall projects modal if needed */}
        <div>
           <button onClick={onViewProjects} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View my projects</button>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {employers.map((employer) => {
          const isExperienceOpen = openExperienceId === employer.id;
          const projectsForExperience = employer.projects || []; // Use the projects array

          // Filter and sort projects for this specific experience
          const filteredAndSortedProjects = filterAndSortProjects(projectsForExperience, employer.id);

          // Determine visible projects for this experience
          const visibleProjectsCountForExperience = visibleProjectsCounts[employer.id] || projectsPerRow;
          const visibleProjects = filteredAndSortedProjects.slice(0, visibleProjectsCountForExperience);
          const hasMoreProjects = visibleProjectsCountForExperience < filteredAndSortedProjects.length;

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
                  {/* Search, Sort, Filter for this specific experience's projects */}
                  {projectsForExperience.length > 0 && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center flex-grow mr-4 border border-gray-300 dark:border-gray-600 rounded px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search projects by title or description"
                          className="flex-grow outline-none text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          value={projectSearchTerms[employer.id] || ''}
                          onChange={e => handleProjectSearchChange(employer.id, e.target.value)}
                        />
                      </div>
                      {/* Sort and Filter Controls */}
                      <div className="flex items-center space-x-4">
                        {/* Sort */}
                        <div className="relative">
                          <select
                            className="appearance-none border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white dark:bg-gray-700"
                            value={projectSortCriteria[employer.id] || 'default'}
                            onChange={e => handleProjectSortChange(employer.id, e.target.value)}
                          >
                            <option value="default">Sort</option>
                            <option value="views">Views</option>
                            <option value="likes">Likes</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                          </div>
                        </div>
                        {/* Filter */}
                        <div className="relative">
                          <select
                            className="appearance-none border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white dark:bg-gray-700"
                            value={projectFilterCriteria[employer.id] || 'all'}
                            onChange={e => handleProjectFilterChange(employer.id, e.target.value)}
                          >
                            <option value="all">All Files</option>
                            <option value="youtube">Youtube</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="tiktok">Tiktok</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                    {employer.type && (
                      <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{employer.type}</span>
                    )}
                    {/* Display projects count from the projects array length */}
                    {projectsForExperience.length > 0 && (
                      <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{projectsForExperience.length} project{projectsForExperience.length !== 1 ? 's' : ''}</span>
                    )}
                    {employer.subscribers !== undefined && (
                      <span className="mr-2 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300">{formatCount(employer.subscribers)} Subs</span>
                    )}
                    <span className="ml-auto text-gray-500 dark:text-gray-400">{employer.duration}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{employer.description}</p>

                  {/* Projects Grid Display */}
                  {visibleProjects.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Projects:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {visibleProjects.map((project) => (
                          <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-700 transition-colors duration-300">
                            <Image
                              src={project.imageUrl || '/images/placeholder-project.jpg'}
                              alt={project.title}
                              width={400}
                              height={200}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-3">
                              <h5 className="text-sm font-semibold text-gray-800 dark:text-white truncate">{project.title}</h5>
                              {/* Project Stats */}
                              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
                                <span className="flex items-center mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.009 9.963 7.182.04.16.04.338 0 .498A10.136 10.136 0 0112 19.5c-4.635 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {formatCount(project.views)}
                                </span>
                                <span className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C10.597 3.876 8.935 2.75 7.063 2.75 4.473 2.75 2.375 4.765 2.375 7.25c0 7.565 7.427 11.65 9.464 12.933.1.064.197.118.301.17z" />
                                  </svg>
                                  {formatCount(project.likes)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Load More Button for Projects within Experience */}
                      {hasMoreProjects && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => handleLoadMoreProjects(employer.id)}
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
                          >
                            Load more projects
                          </button>
                        </div>
                      )}
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