import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running at port ${process.env.PORT || 4000}`);
  });
}
