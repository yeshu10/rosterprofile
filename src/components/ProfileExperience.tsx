"use client";

import type { Experience, Project } from '@/types';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setVisibleExperiencesCount } from '@/lib/uiSlice';
import { openEmployerModal, openProjectDetailModal, setSelectedProject, openProjectsModal } from '@/lib/modalSlice';
import type { RootState } from '@/lib/store';
import { useState, useMemo } from 'react';
import Image from 'next/image';

interface ProfileExperienceProps {
  employers: Experience[];
}

export default function ProfileExperience({
  employers,
}: ProfileExperienceProps) {
  const visibleExperiencesCount = useAppSelector((state: RootState) => state.ui.visibleExperiencesCount);
  const dispatch = useAppDispatch();

  // Local state for managing project display per employer
  const [expandedEmployerId, setExpandedEmployerId] = useState<string | null>(null);
  const [projectSearchTerms, setProjectSearchTerms] = useState<Record<string, string>>({});
  const [projectSortCriteria, setProjectSortCriteria] = useState<Record<string, string>>({});
  const [projectFilterCriteria, setProjectFilterCriteria] = useState<Record<string, string>>({});


  const handleShowMoreExperiences = () => {
    dispatch(setVisibleExperiencesCount(employers.length));
  };

  const handleViewProjectsClick = () => {
    dispatch(openProjectsModal());
  };

  const handleAddExperienceClick = () => {
    dispatch(openEmployerModal(undefined));
  };

  const handleEditExperienceClick = (employer: Experience) => {
    dispatch(openEmployerModal(employer));
  };

  // Toggle visibility of projects for a specific employer
  const handleToggleProjects = (employerId: string) => {
    setExpandedEmployerId(expandedEmployerId === employerId ? null : employerId);
  };

  // Handlers for search, sort, and filter changes for projects of a specific employer
  const handleProjectSearchChange = (employerId: string, term: string) => {
    setProjectSearchTerms({...projectSearchTerms, [employerId]: term});
  };

  const handleProjectSortChange = (employerId: string, criteria: string) => {
    setProjectSortCriteria({...projectSortCriteria, [employerId]: criteria});
  };

   const handleProjectFilterChange = (employerId: string, criteria: string) => {
    setProjectFilterCriteria({...projectFilterCriteria, [employerId]: criteria});
  };

  // Handler to open the project detail modal
  const handleProjectClick = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(openProjectDetailModal());
  };



  return (
    <section id="experience" className="mb-8">
      <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 ">Experience</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleViewProjectsClick}
            className="text-blue-600  hover:underline text-sm font-semibold"
          >
            View Projects
          </button>
          <button
            onClick={handleAddExperienceClick}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {employers.slice(0, visibleExperiencesCount).map((employer) => {
           // Filter and sort projects for the current employer
          const searchTerm = projectSearchTerms[employer.id] || '';
          const sortCriteria = projectSortCriteria[employer.id] || 'default';
          const filterCriteria = projectFilterCriteria[employer.id] || 'all';

          // Moved filtering and sorting logic outside useMemo and directly within the map
          let filteredAndSortedProjects = employer.projects || [];

          // Filter by search term
          if (searchTerm) {
            filteredAndSortedProjects = filteredAndSortedProjects.filter(project =>
              project.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          // Filter by platform
          if (filterCriteria !== 'all') {
            filteredAndSortedProjects = filteredAndSortedProjects.filter(project => project.platform === filterCriteria);
          }

          // Sort projects
          if (sortCriteria === 'views') {
            filteredAndSortedProjects.sort((a, b) => (b.views || 0) - (a.views || 0));
          } else if (sortCriteria === 'likes') {
            filteredAndSortedProjects.sort((a, b) => (b.likes || 0) - (a.likes || 0));
          }


          return (
            <div
              key={employer.id}
              className="border border-gray-200  rounded-lg overflow-hidden p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    {employer.company}
                  </h3>
                  <p className="text-sm text-gray-600 ">{employer.position}</p>
                  <p className="text-sm text-gray-500 ">{employer.duration} ({employer.type})</p>
                </div>
                <div className="flex items-center space-x-2">
                   {/* Toggle Projects Button (Arrow Icon) */}
                  {employer.projects && employer.projects.length > 0 && (
                     <button
                      onClick={() => handleToggleProjects(employer.id)}
                      className="text-gray-400 hover:text-gray-600 "
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${expandedEmployerId === employer.id ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Edit Experience Button */}
                  <button
                    onClick={() => handleEditExperienceClick(employer)}
                    className="text-gray-400 hover:text-gray-600 "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{employer.description}</p>

              {/* Projects Section for this Employer */}
              {employer.projects && employer.projects.length > 0 && expandedEmployerId === employer.id && (
                <div className="mt-4">
                   {/* Search, Sort, Filter Controls */}
                  <div className="flex space-x-4 mb-4">
                    <input
                      type="text"
                      placeholder="Search projects by title..."
                      value={searchTerm}
                      onChange={(e) => handleProjectSearchChange(employer.id, e.target.value)}
                      className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1"
                    />
                    <select
                      value={sortCriteria}
                      onChange={(e) => handleProjectSortChange(employer.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1"
                    >
                      <option value="default">Sort By</option>
                      <option value="views">Views</option>
                      <option value="likes">Likes</option>
                    </select>
                     <select
                      value={filterCriteria}
                      onChange={(e) => handleProjectFilterChange(employer.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1"
                    >
                      <option value="all">Filter By Platform</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                  </div>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAndSortedProjects.map(project => (
                      <div key={project.id} className="cursor-pointer rounded-lg overflow-hidden shadow-sm border border-gray-200" onClick={() => handleProjectClick(project)}>
                         {project.imageUrl && (
                           <div className="relative w-full h-32 bg-gray-200">
                              <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: 'cover' }} />
                           </div>
                         )}
                        <div className="p-3">
                           <h4 className="text-sm font-semibold text-gray-800 truncate">{project.title}</h4>
                           <p className="text-xs text-gray-600 mt-1 truncate">{project.description}</p>
                           {/* You can add more project details here if needed */}
                         </div>
                      </div>
                    ))}
                     {filteredAndSortedProjects.length === 0 && (
                        <p className="text-sm text-gray-600">No projects found matching your criteria.</p>
                     )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show more experiences button */}
      {visibleExperiencesCount < employers.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-blue-600  hover:underline text-sm font-semibold"
            onClick={handleShowMoreExperiences}
          >
            Show more experiences
          </button>
        </div>
      )}
      </div>
    </section>
  );
}
