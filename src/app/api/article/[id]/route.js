import { NextResponse } from "next/server";
import Article from "@/lib/models/article.model";
import { connectMongoDb } from "@/lib/mongodb/mongoose";

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDb();
    const deletedArticle = await Article.findOneAndDelete({ _id: id });
    if (!deletedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
