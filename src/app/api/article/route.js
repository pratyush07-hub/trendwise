import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import Article from "@/lib/models/article.model";
import { connectMongoDb } from "@/lib/mongodb/mongoose";

export async function GET() {
  try {
    await connectMongoDb();
    const articles = await Article.find().populate("createdBy").sort({ createdAt: -1 });
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
