import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorEmail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
