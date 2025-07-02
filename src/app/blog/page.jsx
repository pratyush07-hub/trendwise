// app/blog/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import BlogsPage from "@/components/BlogsPage";

const BlogsPage = dynamic(() => import("./BlogsPageClient"), { ssr: false });

export default function BlogPageWrapper() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogsPage />
    </Suspense>
  );
}
