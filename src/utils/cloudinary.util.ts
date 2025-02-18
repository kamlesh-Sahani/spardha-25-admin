"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File, teamID: number) {
  try {
    if (!file) {
      throw new Error("No file uploaded.");
    }

    // Convert the file to a buffer
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: `spardha/team-${teamID}`,
        },
        (err, result) => {
          if (err) {
            reject(err.message);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject("Upload failed with unknown error.");
          }
        }
      );

      uploadStream.end(bytes);
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
