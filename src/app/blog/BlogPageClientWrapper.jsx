"use client";
import dynamic from "next/dynamic";

const BlogsPage = dynamic(() => import("@/components/BlogsPage"), { ssr: false });

export default function BlogPageClientWrapper() {
  return <BlogsPage />;
} 