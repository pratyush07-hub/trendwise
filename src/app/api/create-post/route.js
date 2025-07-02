import { connectMongoDb } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/lib/models/user.model";
import Article from "@/lib/models/article.model";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("DEBUG: No session or user email", { session });
      return NextResponse.json({ message: "Unauthorized", debug: { session } }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, category } = body || {};

    if (!title || !slug || !content || !category) {
      console.log("DEBUG: Missing fields", { title, slug, content, category });
      return NextResponse.json(
        { message: "All fields are required", debug: { title, slug, content, category } },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      console.log("DEBUG: User not found in DB", { email: session.user.email });
      return NextResponse.json(
        { message: "User not found in database", debug: { email: session.user.email } },
        { status: 404 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      content,
      category,
      createdBy: user._id,
      authorName: user.name,
      authorEmail: user.email,
    });

    return NextResponse.json(
      { message: "Blog Created", article },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/create-post:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
