export default function FeedbackCard({
  title,
  items = [],
  icon,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{icon}</span>

        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-gray-700 leading-relaxed"
            >
              <span className="mt-1 text-gray-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          No feedback available.
        </p>
      )}
    </div>
  );
}