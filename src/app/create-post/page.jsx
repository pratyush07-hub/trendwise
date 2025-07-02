"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [creating, setCreating] = useState(false);

  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const session = await getSession();
      if (session && session.user?.email) {
        setAllowed(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    }
    checkAccess();
  }, [router]);

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    const res = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, slug, content, category }),
    });

    setCreating(false);
    if (res.ok) {
      alert("✅ Blog created successfully!");
      router.push("/blog");
    } else {
      alert("❌ Failed to create blog.");
    }
  };

  const generateWithAI = async () => {
    if (!topic.trim()) return alert("Please enter a topic first.");
    setGenerating(true);

    const res = await fetch("/api/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();

    if (res.ok && data) {
      const aiTitle = data.title || topic;
      const aiSlug = generateSlug(aiTitle);
      setTitle(aiTitle);
      setSlug(aiSlug);
      setCategory(data.category || "General");
      setContent(data.content || "");
    } else {
      alert("Failed to generate content: ${data.message}");
    }

    setGenerating(false);
  };

  if (loading) return <p className="p-4">Checking access...</p>;
  if (!allowed) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">Create a New Blog</h1>

      <div className="mb-8 flex flex-col md:flex-row items-center gap-4 bg-indigo-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Enter topic for AI to generate content"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 border-2 border-indigo-200 focus:border-indigo-500 transition p-2 rounded-lg outline-none bg-white shadow-sm"
        />
        <button
          type="button"
          onClick={generateWithAI}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-60"
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6 md:w-2/5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                const t = e.target.value;
                setTitle(t);
                setSlug(generateSlug(t));
              }}
              className="w-full border-2 border-gray-200 focus:border-indigo-400 transition p-3 rounded-lg outline-none text-lg shadow-sm"
              required
            />
            <input
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full border-2 border-gray-200 focus:border-indigo-400 transition p-3 rounded-lg outline-none text-lg shadow-sm"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., AI, Tech)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-indigo-400 transition p-3 rounded-lg outline-none text-lg shadow-sm"
              required
            />
          </div>
          <div className="flex-1 md:w-3/5">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="w-full h-full min-h-[250px] md:min-h-[350px] border-2 border-gray-200 focus:border-indigo-400 transition p-3 rounded-lg outline-none text-lg shadow-sm resize-none text-base md:h-[70%]"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-60"
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
