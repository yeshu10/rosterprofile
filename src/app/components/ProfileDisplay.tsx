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
    <main className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:grid md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center md:items-start">
          {/* Placeholder for profile image */}
          <div className="rounded-full overflow-hidden w-32 h-32 bg-gray-200 mb-4 flex items-center justify-center">
             {/* You can add an Image component here later */}
              <span className="text-gray-500 text-6xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold mb-1 capitalize text-gray-800 text-center md:text-left">{username} Tholén</h1> {/* Added mock last name */}
          <p className="text-gray-600 text-sm mb-4">Video Editor</p>
          <button className="mt-2 px-4 py-1 text-sm text-green-800 bg-green-200 rounded-full font-semibold">Open to work</button>

          {/* Mock Roster Top Voice Tag */}
          <div className="mt-4 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full inline-flex items-center">
              <span className="mr-1">🏅</span> Roster Top Voice
          </div>

          {/* Mock Location */}
          <div className="mt-6 text-gray-600 text-sm text-center md:text-left w-full">
            <div className="flex items-center mb-1">
                <span className="mr-2 text-green-500">✅</span>
                <span>Verified Jan 19, 2024</span>
            </div>
            <div className="flex items-center">
                 <span className="mr-2 text-gray-500">🌍</span>
                 <span>Los Angeles, United States</span>
            </div>
          </div>
           {/* Mock Quick Menu */}
            <div className="mt-8 w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Quick Menu</h3>
                <ul className="space-y-2 text-sm text-blue-600">
                    <li><a href="#about" className="hover:underline">About</a></li>
                    <li><a href="#experience" className="hover:underline">Worked With</a></li>
                    <li><a href="#projects" className="hover:underline">Projects</a></li>
                    <li><a href="#job-types" className="hover:underline">Job Types & Pricing</a></li>
                     <li><a href="#content-verticals" className="hover:underline">Content Verticals</a></li>
                </ul>
             </div>

        </div>

        {/* Right Content Area */}
        <div className="md:col-span-2 p-6">
          <section id="about" className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between border-b pb-2">
              About me
              {!editingBasicInfo && (
                <button
                  className="ml-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                  onClick={handleEditBasicInfo}
                >
                  Edit
                </button>
              )}
            </h2>
            {editingBasicInfo ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    name="firstName"
                    value={basicInfoForm.firstName}
                    onChange={handleChangeBasicInfo}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    name="lastName"
                    value={basicInfoForm.lastName}
                    onChange={handleChangeBasicInfo}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Introduction</label>
                  <textarea
                    name="intro"
                    value={basicInfoForm.intro}
                    onChange={handleChangeBasicInfo}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    rows={6}
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleSaveBasicInfo}
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCancelBasicInfo}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">{basicInfo.intro}</p>
              </div>
            )}
          </section>

          <section id="experience" className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between border-b pb-2">
              My experience ({employers.length})
               <button
                  className="ml-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium"
                  onClick={handleAddEmployer}
                >
                  Add Employer
                </button>
            </h2>
            <div className="space-y-6">
              {employers.map(employer => (
                <EmployerSection
                  key={employer.id}
                  employer={employer}
                  onUpdate={handleUpdateEmployer}
                  onDelete={handleDeleteEmployer}
                />
              ))}
            </div>
             <button className="mt-6 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">View my projects</button>
          </section>

           {/* Placeholder for other sections like Job Types, Content Verticals */}
           <section id="job-types" className="mb-8">
               <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Job Types & Pricing</h2>
               <div className="text-gray-600 text-sm">(Job types and pricing information will go here)</div>
           </section>

           <section id="content-verticals" className="mb-8">
               <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Content Verticals</h2>
               <div className="text-gray-600 text-sm">(Content verticals information will go here)</div>
           </section>

        </div>
      </div>
    </main>
  );
}
