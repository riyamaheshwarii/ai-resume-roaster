import { useState } from "react";
import UploadDropzone from "../components/UploadDropzone";
import ScoreCircle from "../components/ScoreCircle";
import FeedbackCard from "../components/FeedbackCard";
import Header from "../components/Header";

export default function Home() {
  const [result, setResult] = useState(null);

  const handleAnalysisComplete = (data) => {
    console.log("API RESPONSE:", data);
    setResult(data);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium mb-6">
              🔥 AI-powered resume analysis
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Your resume deserves
              <span className="text-red-600"> honest feedback.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-500 leading-8">
              Upload your resume and let AI analyze its strengths, weaknesses,
              ATS compatibility, and the improvements that can make it stronger.
            </p>
          </div>

          {/* Upload */}
          <UploadDropzone
            onAnalysisComplete={handleAnalysisComplete}
          />

          {/* Results */}
          {result?.analysis && (
            <div className="mt-12 bg-white rounded-3xl shadow-md border border-gray-200 p-6 md:p-10">
              
              {/* Score */}
              <div className="mb-10">
                <ScoreCircle score={result.analysis.score} />
              </div>

              {/* Overall Feedback */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Overall Feedback
                </h2>

                <p className="mt-4 text-gray-600 leading-7 text-lg">
                  {result.analysis.summary}
                </p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <FeedbackCard
                  title="Strengths"
                  icon="💪"
                  items={result.analysis.strengths}
                />

                <FeedbackCard
                  title="Weaknesses"
                  icon="⚠️"
                  items={result.analysis.weaknesses}
                />
              </div>

              {/* Suggestions */}
              <div className="mt-6">
                <FeedbackCard
                  title="Suggestions"
                  icon="💡"
                  items={result.analysis.suggestions}
                />
              </div>

              <div className="mt-6">
                <FeedbackCard
                  title="Detected Skills"
                  icon="🧠"
                  items={result.analysis.skills}
                />
              </div>

              {/* ATS Feedback */}
              <div className="mt-6">
                <FeedbackCard
                  title="ATS Feedback"
                  icon="🤖"
                  items={result.analysis.atsFeedback}
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`/feedback/${result.resumeId}`}
                  className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-700 transition"
                >
                  View Full Feedback →
                </a>

                <button
                  onClick={() => setResult(null)}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  🔄 Roast Another Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}