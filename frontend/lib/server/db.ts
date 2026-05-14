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

function isConnected() {
  return mongoose.connection.readyState === 1;
}

export async function connectDB() {
  if (cached.conn && isConnected()) {
    return cached.conn;
  }

  // Drop stale handles (Atlas idle pause, TCP closed, or recycled serverless instance).
  cached.conn = null;
  cached.promise = null;

  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.disconnect();
    } catch {
      // ignore
    }
  }

  if (!mongoUri) {
    throw new Error("MongoDB connection string is not set (MONGO_URI/MONGODB_URI)");
  }

  cached.promise = mongoose.connect(mongoUri, {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 20000,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
