"use client";

import { useState, useMemo } from 'react';
import type { Experience, Project } from '@/types';
import Image from 'next/image';
// Remove modal component imports from here
// import ProjectDetailModal from '@/components/modals/ProjectDetailModal';
// import EmployerModal from '@/components/modals/EmployerModal';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setVisibleExperiencesCount } from '@/lib/uiSlice';
import { openProjectsModal, openEmployerModal, setSelectedProject } from '@/lib/modalSlice'; // Import necessary modal actions

interface ProfileExperienceProps {
  employers: Experience[];
  onUpdateExperience?: (updatedExperience: Experience[]) => void;
}

export default function ProfileExperience({
  employers,
  onUpdateExperience
}: ProfileExperienceProps) {
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
  // State to manage the employer modal
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState<Experience | undefined>();

  const projectsPerRow = 3;

  // Use typed selector to access visibleExperiencesCount from Redux
  const visibleExperiencesCount = useAppSelector(state => state.ui.visibleExperiencesCount);
  // Get modal states from Redux (if needed in this component, though likely not for rendering)
  // const { isEmployerModalOpen, selectedEmployer, isProjectsModalOpen, selectedProject: reduxSelectedProject } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch(); // Use typed dispatch

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

  const handleProjectSearchChange = (id: string, term: string) => {
    setProjectSearchTerms(prev => ({ ...prev, [id]: term }));
  };

  const handleProjectSortChange = (id: string, criteria: string) => {
    setProjectSortCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  const handleProjectFilterChange = (id: string, criteria: string) => {
    setProjectFilterCriteria(prev => ({ ...prev, [id]: criteria }));
  };

  const handleLoadMoreProjects = (id: string) => {
    setVisibleProjectsCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || projectsPerRow) + projectsPerRow
    }));
  };

  // Dispatch action to set selected project and open detail modal
  const handleOpenProjectDetailModal = (project: Project) => {
      dispatch(setSelectedProject(project)); // Dispatch action to set selected project in Redux
      // The ProjectDetailModal component watches the selectedProject state to open itself
  };

  // Dispatch action to clear selected project and close detail modal (if needed, modal handles close based on state)
   // const handleCloseProjectDetailModal = () => {
   //    dispatch(setSelectedProject(null));
   // };


  // Dispatch open projects modal action
  const handleViewProjectsClick = () => {
    dispatch(openProjectsModal());
  };

  // Dispatch open employer modal action for adding
  const handleAddExperienceClick = () => {
    dispatch(openEmployerModal(undefined)); // Pass undefined for adding new experience
  };

  // Dispatch open employer modal action for editing
  const handleEditExperienceClick = (employer: Experience) => {
    dispatch(openEmployerModal(employer)); // Pass the employer data for editing
  };


  const handleShowMoreExperiences = () => {
    dispatch(setVisibleExperiencesCount(employers.length));
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 ">Experience</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleViewProjectsClick} // Use handler that dispatches action
            className="text-blue-600  hover:underline text-sm font-semibold"
          >
            View Projects
          </button>
          <button
            onClick={handleAddExperienceClick} // Use handler that dispatches action
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {employers.slice(0, visibleExperiencesCount).map((employer) => {
          const isExperienceOpen = openExperienceId === employer.id;
          const searchTerm = projectSearchTerms[employer.id] || '';
          const sortCriteria = projectSortCriteria[employer.id] || 'default';
          const filterCriteria = projectFilterCriteria[employer.id] || 'all';
          const visibleCount = visibleProjectsCounts[employer.id] || projectsPerRow;

          // Filter and sort projects
          const filteredProjects = (employer.projects || [])
            .filter(project => {
              const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesFilter = filterCriteria === 'all' || project.platform === filterCriteria;
              return matchesSearch && matchesFilter;
            })
            .sort((a, b) => {
              if (sortCriteria === 'views') return (b.views || 0) - (a.views || 0);
              if (sortCriteria === 'likes') return (b.likes || 0) - (a.likes || 0);
              return 0;
            });

          const visibleProjects = filteredProjects.slice(0, visibleCount);
          const hasMoreProjects = visibleProjects.length < filteredProjects.length;

          return (
            <div
              key={employer.id}
              className="border border-gray-200  rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 ">
                      {employer.company}
                    </h3>
                    <p className="text-sm text-gray-600 ">{employer.position}</p>
                    <p className="text-sm text-gray-500 ">{employer.duration}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditExperienceClick(employer)} // Use handler that dispatches action for editing
                      className="text-gray-400 hover:text-gray-600 "
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => toggleExperience(employer.id)}
                      className="text-gray-400 hover:text-gray-600 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform ${isExperienceOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {isExperienceOpen && (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-600 ">{employer.description}</p>

                    {/* Projects Section */}
                    {(employer.projects || []).length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Projects:</h4>
                        
                        {/* Search, Sort, Filter Controls */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center flex-grow mr-4 border border-gray-300  rounded px-3 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500  mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search projects by title"
                              className="flex-grow outline-none text-sm bg-white text-gray-900"
                              value={searchTerm}
                              onChange={e => handleProjectSearchChange(employer.id, e.target.value)}
                            />
                          </div>
                          {/* Sort and Filter Controls */}
                          <div className="flex items-center space-x-4">
                            {/* Sort */}
                            <div className="relative">
                              <select
                                className="appearance-none border border-gray-300 rounded px-3 py-1 text-sm text-gray-700  leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white "
                                value={sortCriteria}
                                onChange={e => handleProjectSortChange(employer.id, e.target.value)}
                              >
                                <option value="default">Sort</option>
                                <option value="views">Views</option>
                                <option value="likes">Likes</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                              </div>
                            </div>
                            {/* Filter */}
                            <div className="relative">
                              <select
                                className="appearance-none border border-gray-300 rounded px-3 py-1 text-sm text-gray-700  leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white "
                                value={filterCriteria}
                                onChange={e => handleProjectFilterChange(employer.id, e.target.value)}
                              >
                                <option value="all">Filter by</option>
                                <option value="youtube">Youtube</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="tiktok">Tiktok</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Projects Grid */}
                         {visibleProjects.length > 0 ? (
                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                             {visibleProjects.map((project) => (
                               <div
                                 key={project.id}
                                 className="border border-gray-200  rounded-lg overflow-hidden shadow-sm bg-white  transition-colors duration-300 cursor-pointer"
                                 onClick={() => handleOpenProjectDetailModal(project)} // Use handler that dispatches action
                               >
                                 <Image
                                   src={project.imageUrl || '/images/placeholder-project.jpg'}
                                   alt={project.title}
                                   width={400}
                                   height={200}
                                   className="w-full h-32 object-cover"
                                 />
                                 <div className="p-4">
                                   <h5 className="text-sm font-medium text-gray-900  mb-1">
                                     {project.title}
                                   </h5>
                                   <p className="text-xs text-gray-500  mb-2">
                                     {project.description}
                                   </p>
                                   <div className="flex items-center text-xs text-gray-500 ">
                                     <span className="flex items-center mr-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                       </svg>
                                       {formatCount(project.views)}
                                     </span>
                                     <span className="flex items-center">
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                       </svg>
                                       {formatCount(project.likes)}
                                     </span>
                                   </div>
                                 </div>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <p className="text-sm text-gray-500 ">No projects found.</p>
                         )}

                        {hasMoreProjects && (
                          <div className="mt-4 text-center">
                            <button
                              onClick={() => handleLoadMoreProjects(employer.id)} // Use local handler
                              className="text-blue-600  hover:underline text-sm font-semibold"
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
            </div>
          );
        })}
      </div>

      {/* Show more work experience button */}
      <div className="text-center mt-4">
        <button
          onClick={handleShowMoreExperiences} // Use local handler that dispatches action
          className="text-blue-600 hover:underline text-sm font-semibold"
        >
          Show more work experience
        </button>
      </div>

      {/* Modals are rendered in page.tsx and controlled by Redux state */}

    </div>
  );
} 