import { prisma } from "../../lib/db";
import ScoreCircle from "../../components/ScoreCircle";
import FeedbackCard from "../../components/FeedbackCard";

export default function FeedbackPage({ analysis }) {
  if (!analysis) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Feedback not found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find feedback for this resume.
          </p>

          <a
            href="/"
            className="inline-block mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl"
          >
            Go back
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back to Resume Roaster
          </a>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Resume Feedback
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 md:p-10">
          <div className="mb-10">
            <ScoreCircle score={analysis.score} />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Overall Feedback
            </h2>

            <p className="mt-4 text-gray-600 leading-7 text-lg">
              {analysis.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <FeedbackCard
              title="Strengths"
              icon="💪"
              items={analysis.strengths}
            />

            <FeedbackCard
              title="Weaknesses"
              icon="⚠️"
              items={analysis.weaknesses}
            />
          </div>

          <div className="mt-6">
            <FeedbackCard
              title="Suggestions"
              icon="💡"
              items={analysis.suggestions}
            />
          </div>

          <div className="mt-6">
            <FeedbackCard
              title="Detected Skills"
              icon="🧠"
              items={analysis.skills}
            />
          </div>

          <div className="mt-6">
            <FeedbackCard
              title="ATS Feedback"
              icon="🤖"
              items={analysis.atsFeedback}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const analysis = await prisma.analysis.findUnique({
      where: {
        resumeId: params.id,
      },
    });

    if (!analysis) {
      return {
        props: {
          analysis: null,
        },
      };
    }

    return {
      props: {
        analysis: JSON.parse(JSON.stringify(analysis)),
      },
    };
  } catch (error) {
    console.error("Feedback page error:", error);

    return {
      props: {
        analysis: null,
      },
    };
  }
}