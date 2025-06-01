"use client";
import { useState } from "react";

interface EmployerSectionProps {
  employer: {
    id: number;
    name: string;
    jobTitle: string;
    duration: string;
    type: "Full-time" | "Contract" | "Freelance";
    summary: string;
    videos: string[]; // Mock video data (URLs or IDs)
  };
  onUpdate: (updatedEmployer: EmployerSectionProps['employer']) => void;
  onDelete: (employerId: number) => void;
}

export default function EmployerSection({ employer, onUpdate, onDelete }: EmployerSectionProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(employer);

  const handleEdit = () => {
    setForm(employer);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(form);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(employer.id);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      {editing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={3}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700">Videos (IDs)</label>
             <div className="mt-1 text-sm text-gray-600 border border-gray-300 rounded-md p-2">
                {form.videos.length > 0 ? (
                   <ul className="list-disc list-inside">
                      {form.videos.map((videoId, index) => (
                         <li key={index}>{videoId}</li>
                      ))}
                   </ul>
                ) : (
                   "No videos associated."
                )}
             </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{employer.name}</h3>
             <button
                className="ml-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                onClick={handleEdit}
              >
                Edit
              </button>
          </div>
          <p className="text-gray-700 text-sm"><span className="font-medium">{employer.jobTitle}</span> | {employer.duration} | <span className="font-medium">{employer.type}</span></p>
          <p className="text-gray-600 mt-1 text-sm">{employer.summary}</p>
          <div>
             <h4 className="text-md font-semibold mb-1 text-gray-800">Videos</h4>
             <div className="text-sm text-gray-600 border border-gray-200 rounded-md p-2">
                {employer.videos.length > 0 ? (
                   <ul className="list-disc list-inside">
                      {employer.videos.map((videoId, index) => (
                         <li key={index}>{videoId}</li>
                      ))}
                   </ul>
                ) : (
                   "No videos associated."
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
