export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-4">
        <span className="text-6xl mb-2">🚀</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text mb-2">
          About TrendWise
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Empowering readers and creators through curated blogs across every niche.
        </p>
        <p className="mt-2 text-base text-blue-700 font-semibold">Your digital hub for knowledge and inspiration.</p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border-t-4 border-blue-200">
          <span className="text-3xl">🧑‍💻</span>
          <h3 className="font-bold text-lg text-blue-700">For Developers</h3>
          <p className="text-gray-600 text-sm">Explore tech, code, and AI blogs curated by experts.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border-t-4 border-indigo-200">
          <span className="text-3xl">🌍</span>
          <h3 className="font-bold text-lg text-indigo-700">For the Curious</h3>
          <p className="text-gray-600 text-sm">Browse diverse topics: art, wellness, travel, and more.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border-t-4 border-pink-200">
          <span className="text-3xl">📝</span>
          <h3 className="font-bold text-lg text-pink-700">For Creators</h3>
          <p className="text-gray-600 text-sm">Share your voice and insights with a thriving community.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-2xl">
          We aim to create a vibrant community where both creators and readers thrive. Every blog is carefully authored and managed by our verified admins to ensure quality and relevance. With features like admin authentication, category filters, and a growing library of blogs, we're building a platform that grows with your curiosity.
        </p>
      </section>

      {/* Quote/Testimonial Section */}
      <section className="flex flex-col items-center">
        <blockquote className="relative bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-md max-w-2xl mx-auto text-lg italic text-blue-900">
          <span className="absolute -left-4 top-2 text-3xl text-blue-300">“</span>
          Blogs aren't just content — they're voices, experiences, and connections.
        </blockquote>
      </section>

      {/* Footer Section */}
      <section className="mt-8 text-center flex flex-col items-center gap-2">
        <div className="flex gap-2 justify-center text-xl text-gray-400 mb-1">
          <span title="Next.js">▲</span>
          <span title="MongoDB">🍃</span>
          <span title="Tailwind CSS">🌬️</span>
        </div>
        <p className="text-sm text-gray-500">Made with ❤️ using Next.js, MongoDB, and Tailwind CSS.</p>
      </section>
    </main>
  );
}
