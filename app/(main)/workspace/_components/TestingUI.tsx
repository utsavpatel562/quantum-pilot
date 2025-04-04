"use client";

import React, { useState } from "react";

type ClassificationResult = {
  label: string;
  score: number;
};

export default function TestingUI() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ClassificationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult([]);

    try {
      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      console.log("API response:", data); // Log the full response to check its structure

      if (response.ok && Array.isArray(data) && data.length > 0) {
        const result = data.map((item: { label: string; score: number }) => ({
          label: item.label,
          score: item.score,
        }));
        setResult(result);
      } else {
        setError(data.message || "Invalid result format from API");
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError("Failed to fetch API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Text Sentiment Analysis</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          placeholder="Enter text for sentiment analysis..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      {result.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
          {result.map((res: ClassificationResult, index: number) => (
            <p key={index}>
              <strong>{res.label}</strong>: {Math.round(res.score * 100)}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
