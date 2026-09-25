export default function ScoreCircle({ score = 0 }) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-40 h-40 rounded-full border-[12px] border-gray-200 flex items-center justify-center ${getScoreColor()}`}
      >
        <div className="text-center">
          <div className="text-5xl font-bold">{score}</div>
          <div className="text-sm text-gray-500 font-medium">/ 100</div>
        </div>
      </div>

      <p className="mt-4 text-lg font-semibold text-gray-800">
        Resume Score
      </p>
    </div>
  );
}