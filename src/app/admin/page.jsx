import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { connectMongoDb } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user.model";
import Article from "@/lib/models/article.model";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log("No session found, redirecting to home");
    
    redirect("/?error=unauthorized");
  }

  await connectMongoDb();

  const user = await User.findOne({ email: session.user.email });

  if (!user?.isAdmin) {
    console.log("User is not admin, redirecting to home");
    
    redirect("/?error=unauthorized");

  }

  const allPosts = await Article.find();
  const recentPosts = await Article.find().sort({ createdAt: -1 }).limit(5);
  const totalCategories = new Set(allPosts.map((post) => post.category)).size;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin {user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Posts</p>
          <p className="text-2xl font-bold">{allPosts.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold">{totalCategories}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500">Recent Activity</p>
          <p className="text-2xl font-bold">New Posts Added</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        <Link href="/admin/posts" className="text-sm text-blue-600 underline">
          View All
        </Link>
      </div>

      <ul className="space-y-4">
        {recentPosts.map((post) => (
          <li key={post._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-500">Category: {post.category}</p>
            <Link
              href={`/article/${post.slug}`}
              className="text-blue-600 text-sm underline"
            >
              View Article
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
