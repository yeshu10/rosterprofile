"use client";

import { Fragment, useState, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { Project } from '@/data/mockProjects';
import Image from 'next/image';

interface ProjectsModalProps {
  projects: Project[];
  onClose: () => void;
}

export default function ProjectsModal({ projects, onClose }: ProjectsModalProps) {
  const projectsPerRow = 3;
  const initialVisibleProjects = projectsPerRow; // Show 1 row (3 projects) initially

  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('default'); // e.g., 'default', 'views', 'likes'
  const [filterCriteria, setFilterCriteria] = useState('all'); // e.g., 'all', 'youtube'
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(initialVisibleProjects);

  // Filter projects based on search term and platform
  const filteredProjects = useMemo(() => {
    const initialProjects = projects;

    // Filter by search term
    const searchedProjects = searchTerm
      ? initialProjects.filter(project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : initialProjects;

    // Filter by platform
    const finalFilteredProjects = filterCriteria !== 'all'
      ? searchedProjects.filter(project => project.platform === filterCriteria)
      : searchedProjects;

    return finalFilteredProjects;
  }, [projects, searchTerm, filterCriteria]);

  // Sort projects
  const sortedAndFilteredProjects = useMemo(() => {
    const initialFilteredProjects = [...filteredProjects];

    // Basic sorting (can be expanded)
    if (sortCriteria === 'views') {
      initialFilteredProjects.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortCriteria === 'likes') {
      initialFilteredProjects.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return initialFilteredProjects;
  }, [filteredProjects, sortCriteria]);

  const visibleProjects = sortedAndFilteredProjects.slice(0, visibleProjectsCount);
  const hasMoreProjects = visibleProjectsCount < sortedAndFilteredProjects.length;

  const handleLoadMore = () => {
    setVisibleProjectsCount(prevCount => prevCount + projectsPerRow);
  };

  // Helper to format numbers (e.g., 27.3M, 640k)
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
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-10 transition-opacity" />
          
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-colors duration-300 overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 ">
                    All projects
                  </Dialog.Title>
                  {/* Close Button */}
                  <button
                    type="button"
                    className="text-gray-400  hover:text-gray-600"
                    onClick={onClose}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Search, Sort, Filter */}
                <div className="flex items-center space-x-4 mb-6">
                   {/* Search */}
                   <div className="flex items-center flex-grow border border-gray-300  rounded px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500  mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by title"
                          className="flex-grow outline-none text-sm text-gray-900 "
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Sort */}
                    <div className="relative">
                        <select
                          className="appearance-none border border-gray-300  rounded px-3 py-1 text-sm text-gray-700  leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white"
                          value={sortCriteria}
                          onChange={(e) => setSortCriteria(e.target.value)}
                        >
                          <option value="default">Sort</option>
                          <option value="views">Views</option>
                          <option value="likes">Likes</option>
                           {/* Add more sort options */}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                          </div>
                    </div>
                     {/* Filter */}
                    <div className="relative">
                       <select
                          className="appearance-none border border-gray-300  rounded px-3 py-1 text-sm text-gray-700  leading-tight focus:outline-none focus:shadow-outline pr-8 bg-white "
                          value={filterCriteria}
                          onChange={(e) => setFilterCriteria(e.target.value)}
                        >
                          <option value="all">Filter by</option>
                          <option value="youtube">Youtube</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="tiktok">Tiktok</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                          </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {visibleProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200  rounded-lg overflow-hidden shadow-sm bg-white  transition-colors duration-300">
                       {/* Placeholder Image */}
                      <Image
                        src={project.imageUrl || '/images/placeholder-project.jpg'} // Use project image or a placeholder
                        alt={project.title}
                        width={400} // Specify appropriate width
                        height={200} // Specify appropriate height
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                         <h4 className="text-md font-semibold text-gray-800 ">{project.title}</h4>
                         <p className="text-sm text-gray-600  mb-2">Video Editor</p>
                         <div className="flex items-center text-gray-500  text-xs">
                           <span className="flex items-center mr-4">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500 ">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.009 9.963 7.182.04.16.04.338 0 .498A10.136 10.136 0 0112 19.5c-4.635 0-8.573-3.007-9.963-7.178z" />
                               <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                             </svg>
                             {formatCount(project.views)}
                           </span>
                           <span className="flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500 ">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C10.597 3.876 8.935 2.75 7.063 2.75 4.473 2.75 2.375 4.765 2.375 7.25c0 7.565 7.427 11.65 9.464 12.933.1.064.197.118.301.17z" />
                             </svg>
                             {formatCount(project.likes)}
                           </span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreProjects && (
                  <div className="mt-6 text-left">
                    <button
                      type="button"
                      className="text-blue-600  hover:underline text-sm font-semibold"
                      onClick={handleLoadMore}
                    >
                      Load more projects
                    </button>
                  </div>
                )}

                 {/* Original Close Button - Remove later */}
                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div> */}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 