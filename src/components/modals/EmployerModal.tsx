"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { Experience } from '@/types';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { closeEmployerModal, ModalState } from '@/lib/modalSlice';
import { addExperience, updateExperience } from '@/lib/profileSlice';

export default function EmployerModal() {
  const { isEmployerModalOpen, selectedEmployer } = useAppSelector(state => state.modal as ModalState);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    duration: '',
    type: undefined,
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (selectedEmployer) {
      setFormData({
        company: selectedEmployer.company || '',
        position: selectedEmployer.position || '',
        duration: selectedEmployer.duration || '',
        type: selectedEmployer.type,
        description: selectedEmployer.description || '',
        startDate: selectedEmployer.startDate || '',
        endDate: selectedEmployer.endDate || '',
      });
    } else {
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
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.company && formData.position && formData.startDate && formData.type) {
      try {
        if (selectedEmployer) {
          const updatedEmployer: Experience = {
            ...selectedEmployer,
            ...formData,
            id: selectedEmployer.id,
            duration: formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : selectedEmployer.duration || '',
            type: formData.type || selectedEmployer.type || 'Full-time',
            projects: selectedEmployer.projects || [],
            subscribers: selectedEmployer.subscribers || 0,
          };
          await dispatch(updateExperience(updatedEmployer as Experience));
        } else {
          const newEmployer: Experience = {
            id: `exp-${Date.now()}`,
            ...formData,
            duration: formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : formData.duration || '',
            type: formData.type || 'Full-time',
            projects: [],
            subscribers: 0,
          } as Experience;
          await dispatch(addExperience(newEmployer as Experience));
        }
        dispatch(closeEmployerModal());
      } catch (err) {
        console.error('Failed to save experience:', err);
      }
    } else {
      console.error('Required fields are missing');
    }
  };

  const handleClose = () => {
    dispatch(closeEmployerModal());
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
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company/Client Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="position"
                      value={formData.position || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={formData.startDate || ''}
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
                        value={formData.endDate || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Employment Type
                    </label>
                    <select
                      id="type"
                      value={formData.type || ''}
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

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Summary of Contributions
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={formData.description || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>

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