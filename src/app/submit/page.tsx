"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileData,
  setLoading,
  setError,
  setUrl,
} from "../../lib/profileSlice";
import { PortfolioParseResponse, ProfileCreateResponse } from "@/types";
import type { RootState } from "../../lib/store"; // Adjust the path to your store

export default function SubmitPortfolio() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { url, loading, error } = useSelector((state: RootState) => state.profile);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setError(null));

    if (!url || !/^https?:\/\//.test(url)) {
      dispatch(setError("Please enter a valid URL."));
      return;
    }

    dispatch(setLoading(true));

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
        dispatch(setError(parseResult.message || "Failed to parse portfolio."));
        dispatch(setLoading(false));
        return;
      }

      dispatch(setProfileData(parseResult.data));

      // Step 2: Create profile
      const createResponse = await fetch("/api/profile/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseResult.data),
      });

      const createResult: ProfileCreateResponse = await createResponse.json();

      if (!createResult.success || !createResult.username) {
        dispatch(setError(createResult.message || "Failed to create profile."));
        dispatch(setLoading(false));
        return;
      }

      // Step 3: Redirect
      router.push(`/profile/${createResult.username}`);
    } catch (err) {
      console.error("API Error:", err);
      dispatch(setError("An error occurred during the process."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 transition-colors duration-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Submit Portfolio URL</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => dispatch(setUrl(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., https://example.com/my-portfolio"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

