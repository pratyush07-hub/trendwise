"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch("/api/article");
      const data = await res.json();
      const all = data.articles || [];

      // 🔍 Filter blogs by title/content if search is active
      const filtered = search
        ? all.filter(
            (blog) =>
              blog.title.toLowerCase().includes(search) ||
              blog.content.toLowerCase().includes(search)
          )
        : all;

      setBlogs(filtered);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto" style={{ backgroundColor: "#eaf4fb" }}>
      {/* Hero Section */}
      <section className="text-center mb-14 flex flex-col items-center gap-2">
        <span className="text-5xl mb-2">📚</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text mb-1 leading-tight">All Blogs</h1>
        <p className="text-gray-600 max-w-lg mx-auto text-base">
          {search
            ? `Results for "${search}"`
            : "Browse all blogs created by our expert admins and discover something new every day."}
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-50 border border-blue-100 transition"
        >
          ← Back to Home
        </Link>
      </section>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div
              key={blog._id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col group transform hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "forwards" }}
            >
              <div className="absolute left-0 top-4 h-10 w-1 rounded bg-gradient-to-b from-blue-400 to-indigo-400"></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {blog.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition duration-200 mb-1">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {blog.content.slice(0, 200)}...
              </p>
              <Link
                href={`/article/${blog.slug}`}
                className="text-indigo-600 text-sm font-semibold hover:underline mt-auto"
              >
                Read Full Blog →
              </Link>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.7s ease forwards;
        }
      `}</style>
    </main>
  );
}
