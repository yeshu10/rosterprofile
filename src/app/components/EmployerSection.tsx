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
    <div className="border border-gray-200 rounded-lg p-4">
      {editing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Job Title</label>
            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Duration</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Summary</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              rows={3}
            />
          </div>
          {/* Video list goes here */}
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
            <h3 className="text-lg font-semibold">{employer.name}</h3>
             <button
                className="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                onClick={handleEdit}
              >
                Edit
              </button>
          </div>
          <p className="text-gray-700 text-sm">{employer.jobTitle} | {employer.duration} | {employer.type}</p>
          <p className="text-gray-600 mt-1 text-sm">{employer.summary}</p>
          {/* Display videos here */}
        </div>
      )}
    </div>
  );
}
