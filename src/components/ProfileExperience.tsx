"use client";


interface ProfileExperienceProps {
  employers: Employer[];
}

export default function ProfileExperience({ employers }: ProfileExperienceProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My experience ({employers.length})</h2>
      <div className="space-y-8">
        {employers.map((employer) => (
          <div key={employer.id} className="border-b border-gray-200 pb-8 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{employer.name}</h3>
                <p className="text-gray-600">{employer.jobTitle}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {employer.type}
              </span>
            </div>
            <p className="text-gray-500 mb-2">{employer.duration}</p>
            <p className="text-gray-700 mb-4">{employer.summary}</p>
            {employer.videos.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Videos:</h4>
                <div className="flex gap-2">
                  {employer.videos.map((video, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {video}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 