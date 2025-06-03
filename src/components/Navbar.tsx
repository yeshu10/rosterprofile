"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black dark:text-white text-xl font-bold">
          Roster Profile
        </div>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
        >
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
} 