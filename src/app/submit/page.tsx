"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PortfolioParseResponse, ProfileCreateResponse } from "@/types";
import { useTheme } from '@/context/ThemeContext';

// Assuming the parse endpoint returns data like { success: boolean, data?: ExtractedData }
// Assuming the create endpoint returns data like { success: boolean, username?: string, message?: string }

export default function SubmitPortfolio() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    console.log('Current theme from useTheme:', theme);
    const htmlElement = document.documentElement;
    console.log('HTML element has dark class:', htmlElement.classList.contains('dark'));
  }, [theme]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!url || !/^https?:\/\//.test(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Call the parse endpoint
      const parseResponse = await fetch("/api/portfolio/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const parseResult: PortfolioParseResponse = await parseResponse.json();

      if (!parseResult.success || !parseResult.data) {
        setError(parseResult.message || "Failed to parse portfolio.");
        setLoading(false);
        return;
      }

      // Step 2: Use parsed data to call the create profile endpoint
      const createResponse = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parseResult.data),
      });

      const createResult: ProfileCreateResponse = await createResponse.json();

      if (!createResult.success || !createResult.username) {
        setError(createResult.message || "Failed to create profile.");
        setLoading(false);
        return;
      }

      // Step 3: Redirect to the created profile page
      router.push(`/profile/${createResult.username}`);

    } catch (err) {
      console.error("API Error:", err);
      setError("An error occurred during the process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Submit Portfolio URL</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Portfolio URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
              placeholder="e.g., https://example.com/my-portfolio"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 