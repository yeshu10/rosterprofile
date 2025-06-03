"use client";

interface ProfileSkillsProps {
  skills: string[];
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <div id="skills" className="mt-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index} // Using index as key as skills are simple strings
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
} 