export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        
        <a
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          AI Resume Roaster 🔥
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Home
          </a>

          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Roast Resume
          </a>
        </nav>

      </div>
    </header>
  );
}