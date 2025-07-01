import { connectMongoDb } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user.model";

export async function POST(req) {
  await connectMongoDb();
  const { email } = await req.json();

  const user = await User.findOneAndUpdate(
    { email },
    { isAdmin: true },
    { new: true }
  );

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response("User promoted to admin", { status: 200 });
}
