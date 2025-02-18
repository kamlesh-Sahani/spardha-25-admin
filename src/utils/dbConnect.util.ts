import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables.");
}

let connection:{isConnected?:number} = {} // Track connection status

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: "spardha-dbit",
    } as mongoose.ConnectOptions);

    connection.isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // process.exit(1); // Exit process on failure
  }
};

export default dbConnect;
