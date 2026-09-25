import { useState } from "react";

export default function UploadDropzone({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("PDF must be smaller than 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume PDF first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
            📄
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Upload your resume
          </h2>

          <p className="mt-2 text-gray-500">
            Get an AI-powered review of your resume in seconds.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            PDF only · Maximum 5 MB
          </p>

          <label className="inline-block cursor-pointer mt-7">
            <span className="inline-flex items-center justify-center bg-gray-900 text-white px-7 py-3 rounded-xl font-medium hover:bg-gray-700 transition">
              Choose PDF
            </span>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <div className="mt-7 rounded-2xl bg-gray-50 border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Selected file
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </p>
              </div>

              <span className="text-sm text-gray-400 shrink-0">
                PDF
              </span>
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full mt-5 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "🔥 Roasting your resume..." : "🔥 Roast My Resume"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}