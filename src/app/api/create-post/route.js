import { connectMongoDb } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Article from "@/lib/models/article.model";
import User from "@/lib/models/user.model";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, category } = body || {};

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      content,
      category,
      createdBy: user._id,
    });

    return NextResponse.json(
      { message: "Blog Created", article },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/create-post:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
