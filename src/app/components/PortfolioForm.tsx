import { useState } from "react";

interface PortfolioFormProps {
  onSuccess: (username: string) => void;
}

export default function PortfolioForm({ onSuccess }: PortfolioFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function extractUsername(url: string) {
    try {
      const u = new URL(url);
      const paths = u.pathname.split("/").filter(Boolean);
      return paths[0] || "profile";
    } catch {
      return "profile";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!url || !/^https?:\/\//.test(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const username = extractUsername(url);
      onSuccess(username);
    }, 1200);
  };

  return (
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
  );
}
