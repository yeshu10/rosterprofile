"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Assuming the parse endpoint returns data like { success: boolean, data?: ExtractedData }
// Assuming the create endpoint returns data like { success: boolean, username?: string, message?: string }

interface PortfolioParseResponse {
  success: boolean;
  data?: any; // Define a more specific type based on the API response
  message?: string;
}

interface ProfileCreateResponse {
  success: boolean;
  username?: string; // Or whatever the profile identifier is named in the API response
  message?: string;
}

export default function SubmitPortfolio() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      const parseResponse = await fetch(
      "https://virtserver.swaggerhub.com/justforlearning-b6e/rosterprofile/1.0.0/api/portfolio/parse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );

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
        // Assuming the create endpoint accepts the data directly from the parse response
        body: JSON.stringify(parseResult.data), // Adjust this based on what /api/profile/create expects
      });

      const createResult: ProfileCreateResponse = await createResponse.json();

      if (!createResult.success || !createResult.username) {
        setError(createResult.message || "Failed to create profile.");
        setLoading(false);
        return;
      }

      // Step 3: Redirect to the created profile page
      router.push(`/profile/${createResult.username}`);

    } catch (err: any) {
      console.error("API Error:", err);
      setError("An error occurred during the process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Submit Your Portfolio Link</h1>
        <input
          type="url"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://yourportfolio.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
} 