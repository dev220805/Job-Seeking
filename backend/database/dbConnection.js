import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MongoDB URI is not defined in environment variables.");
    return;
  }

  mongoose
    .connect(uri, {
      dbName: "MERN_JOB_SEEKING_WEBAPP", 
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occurred. ${err}`);
    });
};
