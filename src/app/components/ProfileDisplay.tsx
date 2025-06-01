"use client";
import { useState, useEffect } from "react";
import EmployerSection from "./EmployerSection";

interface BasicInfo {
  firstName: string;
  lastName: string;
  intro: string;
}

interface Employer {
  id: number;
  name: string;
  jobTitle: string;
  duration: string;
  type: "Full-time" | "Contract" | "Freelance";
  summary: string;
  videos: string[];
}

interface MockProfileData {
  basicInfo: BasicInfo;
  employers: Employer[];
}

interface ProfileDisplayProps {
  username: string;
  initialData: MockProfileData;
}

export default function ProfileDisplay({ username, initialData }: ProfileDisplayProps) {
  // Use initialData from props
  const [basicInfo, setBasicInfo] = useState(initialData.basicInfo);
  const [editingBasicInfo, setEditingBasicInfo] = useState(false);
  const [basicInfoForm, setBasicInfoForm] = useState(initialData.basicInfo);

  // Use initialData from props
  const [employers, setEmployers] = useState<Employer[]>(initialData.employers);
  const [nextEmployerId, setNextEmployerId] = useState(initialData.employers.length > 0 ? Math.max(...initialData.employers.map(emp => emp.id)) + 1 : 1);

  const handleEditBasicInfo = () => {
    setBasicInfoForm(basicInfo);
    setEditingBasicInfo(true);
  };

  const handleCancelBasicInfo = () => {
    setEditingBasicInfo(false);
  };

  const handleChangeBasicInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBasicInfoForm({ ...basicInfoForm, [e.target.name]: e.target.value });
  };

  const handleSaveBasicInfo = () => {
    setBasicInfo(basicInfoForm);
    setEditingBasicInfo(false);
    // In a real app, you would save this to the backend here
    console.log("Saving basic info:", basicInfoForm);
  };

  const handleAddEmployer = () => {
    const newEmployer: Employer = {
      id: nextEmployerId,
      name: "New Employer",
      jobTitle: "",
      duration: "",
      type: "Full-time",
      summary: "",
      videos: [],
    };
    setEmployers([...employers, newEmployer]);
    setNextEmployerId(nextEmployerId + 1);
    // In a real app, you would save this to the backend here
    console.log("Adding employer:", newEmployer);
  };

  const handleUpdateEmployer = (updatedEmployer: Employer) => {
    setEmployers(employers.map(emp => (emp.id === updatedEmployer.id ? updatedEmployer : emp)));
    // In a real app, you would save this to the backend here
    console.log("Updating employer:", updatedEmployer);
  };

  const handleDeleteEmployer = (employerId: number) => {
    setEmployers(employers.filter(emp => emp.id !== employerId));
    // In a real app, you would save this to the backend here
    console.log("Deleting employer with ID:", employerId);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">{username}'s Profile</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1 flex items-center justify-between">
            Basic Info
            {!editingBasicInfo && (
              <button
                className="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                onClick={handleEditBasicInfo}
              >
                Edit
              </button>
            )}
          </h2>
          {editingBasicInfo ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={basicInfoForm.firstName}
                  onChange={handleChangeBasicInfo}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={basicInfoForm.lastName}
                  onChange={handleChangeBasicInfo}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Introduction</label>
                <textarea
                  name="intro"
                  value={basicInfoForm.intro}
                  onChange={handleChangeBasicInfo}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSaveBasicInfo}
                  type="button"
                >
                  Save
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={handleCancelBasicInfo}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-semibold">{basicInfo.firstName} {basicInfo.lastName}</div>
              <div className="text-gray-600 mt-1">{basicInfo.intro}</div>
            </div>
          )}
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
            Employers / Clients
             <button
                className="ml-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                onClick={handleAddEmployer}
              >
                Add Employer
              </button>
          </h2>
          <div className="space-y-4">
            {employers.map(employer => (
              <EmployerSection
                key={employer.id}
                employer={employer}
                onUpdate={handleUpdateEmployer}
                onDelete={handleDeleteEmployer}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
