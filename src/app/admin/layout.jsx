"use client";

import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <>
      {/* Topbar for mobile/tablet (always below main Header) */}
      <nav className="flex md:hidden items-center justify-between px-4 py-3 bg-gray-900 text-white w-full sticky top-0 z-30">
        <div className="text-lg font-semibold bg-blue-500 rounded px-1">Admin Panel</div>
        <div className="flex gap-2 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/create-post">Create Post</Link>
          <Link href="/admin/posts">Manage Posts</Link>
        </div>
      </nav>
      <div className="flex min-h-screen">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex w-64 bg-gray-900 text-white p-6 space-y-4 flex-col">
          <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-4 text-sm">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/create-post">Create Post</Link>
            <Link href="/admin/posts">Manage Posts</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-100 text-black">
          {children}
        </main>
      </div>
    </>
  );
}
