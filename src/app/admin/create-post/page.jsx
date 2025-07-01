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

  useEffect(() => {
    async function checkAccess() {
      const session = await getSession();
      if (session && session.user?.isAdmin) {
        setAllowed(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    }
    checkAccess();
  }, [router]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphen
      .replace(/^-+|-+$/g, "");    // Remove leading/trailing hyphens
  };

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
      router.push("/admin/posts");
    } else {
      alert("❌ Failed to create blog.");
    }
  };

  if (loading) return <p className="p-4">Checking access...</p>;
  if (!allowed) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            const t = e.target.value;
            setTitle(t);
            setSlug(generateSlug(t));
          }}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category (e.g., AI, Tech)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
