import User from "@/lib/models/user.model";
import { connectMongoDb } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";

import dotenv from 'dotenv';
dotenv.config();


export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, isAdmin = false } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    await connectMongoDb(); // Assuming this connects to your MongoDB
    const user = await User.create({ name, email, isAdmin });

    return NextResponse.json({ message: "User Registered", user }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
