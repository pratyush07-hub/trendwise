import mongoose from "mongoose";

let isConnected = false; // global state

export const connectMongoDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment.");
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "trendwise",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // Re-throw to handle it in API routes if needed
  }
};
