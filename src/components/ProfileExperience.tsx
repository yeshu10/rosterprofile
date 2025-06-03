"use client";

import type { Experience } from '@/types';

interface ProfileExperienceProps {
  employers: Experience[];
}

export default function ProfileExperience({ employers }: ProfileExperienceProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Work Experience</h2>
      <div className="space-y-6">
        {employers.map((employer, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900">{employer.position}</h3>
            <p className="text-gray-600 font-medium">{employer.company}</p>
            <p className="text-gray-500 text-sm mb-2">{employer.duration}</p>
            <p className="text-gray-700">{employer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 