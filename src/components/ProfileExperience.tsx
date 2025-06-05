"use client";

import type { Experience } from '@/types';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setVisibleExperiencesCount } from '@/lib/uiSlice';
import { openProjectsModal, openEmployerModal} from '@/lib/modalSlice';
import type { RootState } from '@/lib/store';

interface ProfileExperienceProps {
  employers: Experience[];
}

export default function ProfileExperience({
  employers,
}: ProfileExperienceProps) {
  const visibleExperiencesCount = useAppSelector((state: RootState) => state.ui.visibleExperiencesCount);
  const dispatch = useAppDispatch();

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
        {employers.slice(0, visibleExperiencesCount).map((employer) => (
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
              <button
                onClick={() => handleEditExperienceClick(employer)}
                className="text-gray-400 hover:text-gray-600 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{employer.description}</p>
          </div>
        ))}
      </div>

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