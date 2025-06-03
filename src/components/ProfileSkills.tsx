"use client";

interface ProfileSkillsProps {
  skills: string[];
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <div id="skills" className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index} // Using index as key as skills are simple strings
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
} 