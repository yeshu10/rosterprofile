"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'; 
import { setSelectedProject } from '@/lib/modalSlice'; 

export default function ProjectDetailModal() {

  const { selectedProject: project } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  
  const isOpen = !!project;

  const handleClose = () => {
    dispatch(setSelectedProject(null)); 
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}> {/* Use handleClose */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-colors duration-300">
            
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Project Details
                  </Dialog.Title>
                  
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={handleClose} // Use handleClose
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Project Content */}
                {project && ( 
                  <div className="mt-2 space-y-4">
                    
                    {project.imageUrl && (
                      <div className="w-full h-64 relative rounded-lg overflow-hidden">
                         <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill={true} 
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Project Title */}
                    <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>

                

                    {/* Project Stats */}
                    <div className="flex items-center text-gray-500 text-sm">
                       <span className="flex items-center mr-4">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.009 9.963 7.182.04.16.04.338 0 .498A10.136 10.136 0 0112 19.5c-4.635 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        {formatCount(project.views)}
                      </span>
                      <span className="flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C10.597 3.876 8.935 2.75 7.063 2.75 4.473 2.75 2.375 4.765 2.375 7.25c0 7.565 7.427 11.65 9.464 12.933.1.064.197.118.301.17z" />
                          </svg>
                         {formatCount(project.likes)}
                       </span>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-700 text-sm">{project.description}</p>

                    {/* View Project Button (e.g., View on YouTube) */}
                    {project.projectUrl && (
                      <div className="mt-4">
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5L11 9v7l5.5-2.5z"/></svg>
                          View Project
                        </a>
                      </div>
                    )}

                    
                    {project.githubUrl && ( // Assuming a githubUrl field exists
                      <div className="mt-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                             <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-.901.632-1.102-2.22-.251-4.551-1.113-4.551-4.956 0-1.091.39-1.984 1.029-2.675-.103-.252-.446-1.266.095-2.642 0 0 .84-.268 2.75 1.022A9.628 9.628 0 0112 6.68a9.628 9.628 0 012.504.337c1.909-1.29 2.748-1.022 2.748-1.022.541 1.376.198 2.39.095 2.642.64.691 1.028 1.584 1.028 2.675 0 3.853-2.334 4.691-4.56 4.948.358.308.678.917.678 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.18.59.688.482C19.137 20.202 22 16.447 22 12.017 22 6.484 17.522 2 12 2Z" clipRule="evenodd" />
                           </svg>
                          View on GitHub
                        </a>
                      </div>
                    )}

                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 