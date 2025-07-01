import { connectMongoDb } from "@/lib/mongodb/mongoose";
import Article from "@/lib/models/article.model";

export default async function BlogDetailPage({ params }) {
  const { slug } = params;

  await connectMongoDb();
  const blog = await Article.findOne({ slug }).populate("createdBy");

  if (!blog) {
    return <div className="p-6 text-center text-red-600 text-lg">404 - Blog Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-[#eaf4fb] py-10 px-2">
      <div className="w-11/12 lg:w-[70vw] mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">{blog.category}</span>
          <a href="/blog" className="text-sm text-blue-600 font-medium hover:underline bg-blue-50 px-3 py-1 rounded-full transition">← Back to Blogs</a>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">{blog.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
          <span className="inline-block text-lg">✍️</span>
          <span>By <span className="font-semibold text-gray-700">{blog.createdBy?.name || "Admin"}</span></span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <hr className="mb-8 border-blue-100" />
        <article className="prose prose-blue max-w-none text-lg leading-relaxed text-gray-800 whitespace-pre-line">
          {blog.content}
        </article>
      </div>
    </main>
  );
} 