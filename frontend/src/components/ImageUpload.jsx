import { useState } from "react";
import api from "../api/client";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch {
      setError("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            AI Image Authenticator
          </h1>
          <p className="text-gray-400">
            Upload an image and detect whether it is AI-generated or real.
          </p>
        </div>

        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-indigo-500 transition bg-white/5 mb-8">
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />
          </svg>

          <p className="text-gray-300 font-medium">
            Click to upload an image
          </p>
          <p className="text-sm text-gray-500 mt-1">
            PNG, JPG, JPEG
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Analyze Button */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="
            w-full py-5 text-lg font-extrabold tracking-wide
            rounded-2xl text-white
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            shadow-2xl shadow-indigo-500/40
            hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
            hover:ring-2 hover:ring-indigo-400/40
            active:scale-[0.97]
            transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          {loading ? "Analyzing Image..." : "Analyze Image"}
        </button>

        {/* Loader */}
        {loading && (
          <div className="mt-6 flex justify-center">
            <Loader />
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8">
            <ResultCard {...result} />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mt-6 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
