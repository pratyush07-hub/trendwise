// app/blog/page.tsx
import { Suspense } from "react";
import BlogsPage from "@/components/BlogsPage";
import BlogPageClientWrapper from "./BlogPageClientWrapper";

export default function BlogPageWrapper() {
  return <BlogPageClientWrapper />;
}
