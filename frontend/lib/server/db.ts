import mongoose from "mongoose";

declare global {
  // Reuse the cached connection across hot reloads and serverless invocations.
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const mongoUri = process.env.MONGO_URI ?? process.env.MONGODB_URI;

const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!mongoUri) {
    throw new Error("MongoDB connection string is not set (MONGO_URI/MONGODB_URI)");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
