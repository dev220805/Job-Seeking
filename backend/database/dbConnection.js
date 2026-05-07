import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoCache =
  globalThis.__MONGO_CACHE__ ||
  (globalThis.__MONGO_CACHE__ = {
    promise: null,
  });

export const dbConnection = async () => {
  // If already connected, reuse the existing connection.
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    // Fail fast with a clear message instead of letting Mongoose buffer until timeout.
    throw new Error("MongoDB URI is not defined (missing `MONGO_URI`).");
  }

  if (!mongoCache.promise) {
    mongoCache.promise = mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME || "MERN_JOB_SEEKING_WEBAPP",
      // Prevent very long hangs during cold starts.
      serverSelectionTimeoutMS: 10_000,
    });
  }

  await mongoCache.promise;
  return mongoose.connection;
};
