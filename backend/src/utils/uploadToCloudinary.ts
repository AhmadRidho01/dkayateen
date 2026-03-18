import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  // Extract public_id dari URL
  const parts = imageUrl.split("/");
  const filename = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  const publicId = `${folder}/${filename.split(".")[0]}`;

  await cloudinary.uploader.destroy(publicId);
};
