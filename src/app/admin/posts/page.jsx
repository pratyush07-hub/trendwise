"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ManagePostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || !session.user.isAdmin) {
      router.push("/");
    } else {
      fetchPosts();
    }
  }, [status, session]);

  async function fetchPosts() {
    const res = await fetch("/api/article");
    const data = await res.json();
    setPosts(data.articles);
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const res = await fetch(`/api/article/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } else {
      alert("Failed to delete post");
    }
  }

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">Category: {post.category}</p>
            <p className="text-sm text-gray-500">
              Created by: {post.createdBy?.name || "Unknown"}
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/article/${post.slug}`}
                className="text-blue-600 underline text-sm"
              >
                View Post
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
