"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { Experience } from '@/types';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'; // Import typed hooks
import { closeEmployerModal } from '@/lib/modalSlice'; // Import modal action
import { addEmployer, updateEmployer } from '@/lib/profileSlice'; // Import profile actions

// Remove props as state will be from Redux
// interface EmployerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: Partial<Experience>) => void;
//   initialData?: Experience;
// }

export default function EmployerModal(/* Remove props */) {
  // Get state and dispatch from Redux
  const { isEmployerModalOpen, selectedEmployer } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  // Local state for form data, initialized from selectedEmployer or default
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    duration: '',
    type: undefined, // Assuming type is optional or handled differently
    description: '',
    startDate: '',
    endDate: '',
  });

  // Effect to update form data when selectedEmployer changes (for editing)
  useEffect(() => {
    if (selectedEmployer) {
      setFormData({
        company: selectedEmployer.company || '',
        position: selectedEmployer.position || '',
        duration: selectedEmployer.duration || '',
        type: selectedEmployer.type, // Assuming type is optional or handled differently
        description: selectedEmployer.description || '',
        startDate: selectedEmployer.startDate || '',
        endDate: selectedEmployer.endDate || '',
      });
    } else {
      // Reset form data when adding a new employer
      setFormData({
        company: '',
        position: '',
        duration: '',
        type: undefined,
        description: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [selectedEmployer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch add or update action based on selectedEmployer
    if (selectedEmployer) {
        // Update existing employer
        const updatedEmployer: Experience = { // Ensure all required fields are present
            ...selectedEmployer,
            ...formData,
            // Add logic to combine startDate and endDate into duration if needed
            duration: formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : formData.duration || '',
            type: formData.type || 'Full-time', // Provide a default if type is required
        };
        dispatch(updateEmployer(updatedEmployer));
    } else {
        // Add new employer
        const newEmployer: Experience = { // Ensure all required fields are present
            id: `exp-${Date.now()}`,
            ...formData,
            // Add logic to combine startDate and endDate into duration if needed
             duration: formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : formData.duration || '',
            type: formData.type || 'Full-time', // Provide a default if type is required
             projects: [], // Initialize with empty projects array
             subscribers: 0, // Initialize with 0 subscribers
        } as Experience; // Cast to Experience to satisfy type
        dispatch(addEmployer(newEmployer));
    }
    dispatch(closeEmployerModal()); // Close modal after submit
  };

  const handleClose = () => {
    dispatch(closeEmployerModal()); // Dispatch close action
  };

  return (
    <Transition appear show={isEmployerModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  {selectedEmployer ? 'Edit Employer/Client' : 'Add Employer/Client'}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company/Client Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Duration (Split into Start and End Dates) */}
                   <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                       <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date (or Present)
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Employment Type
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    >
                       <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  {/* Summary of Contributions */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Summary of Contributions
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {selectedEmployer ? 'Save Changes' : 'Add Employer'}
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 