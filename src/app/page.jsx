"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ErrorAlert from "@/components/ErrorAlert";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/article");
    const data = await res.json();
    setBlogs(data.articles || []);
    const uniqueCategories = [...new Set((data.articles || []).map((blog) => blog.category))];
    setCategories(uniqueCategories);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto" style={{ backgroundColor: '#eaf4fb' }}>
      {/* Header */}
      <ErrorAlert />
      <div className="text-center mb-14">
        <div className="flex justify-center mb-3">
          <span className="text-4xl">🪐</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-tight">
          Explore smart reads across tech, art, code, space, health, and more
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
          Discover the latest blogs on development, AI, and technology – written and curated by our expert admins.
        </p>
      </div>

      {/* Categories */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Browse Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200
                ${selectedCategory === cat
                  ? "bg-blue-600 text-white scale-105 shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-200"}
              `}
            >
              {cat}
            </button>
          ))}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-red-50 text-blue-600 rounded-full text-sm font-medium border border-red-100 hover:bg-red-100 transition-all duration-200"
            >
              Clear Filter
            </button>
          )}
        </div>
      </section>

      {/* Blog Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-8 text-gray-800">
          {selectedCategory ? `Blogs in "${selectedCategory}"` : "Latest Blogs"}
        </h2>

        {filteredBlogs.length === 0 ? (
          <p className="text-gray-400 text-center">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col group transform hover:-translate-y-1 opacity-0 animate-fade-in"
                style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'forwards' }}
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{blog.title}</h3>
                <p className="text-gray-400 text-xs mb-3">Category: {blog.category}</p>
                <p className="text-gray-700 mb-4 flex-1 text-sm">
                  {blog.content.slice(0, 150)}...
                </p>
                <Link
                  href={`/article/${blog.slug}`}
                  className="text-sm text-indigo-600 font-semibold hover:underline self-start mt-auto"
                >
                  Read Blog →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <style jsx global>{`
        @keyframes fade-in {
          to { opacity: 1; }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.7s ease forwards;
        }
      `}</style>
    </main>
  );
}
