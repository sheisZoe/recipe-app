"use server";

import { imagekit } from "@/lib/imagekit";
import { ImageType } from "@/lib/validators/product";

type UploadResponse = {
  data?: ImageType[];
  error?: string;
};

type OtherResponse = {
  data?: boolean;
  error?: string;
};

export const uploadImages = async (
  folderName: string,
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const files = formData.getAll("image") as File[];
    const uploads = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await imagekit.upload({
          file: buffer,
          fileName: file.name,
          folder: folderName,
        });

        return { ...result } satisfies ImageType;
      })
    );
    return { data: uploads };
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
    return { error: "Image upload failed" };
  }
};

export const deleteImage = async (
  fileId: string,
  id?: string
): Promise<OtherResponse> => {
  try {
    await imagekit.deleteFile(fileId);
    return { data: true };
  } catch (error) {
    console.error("Error deleting image from ImageKit:", error);
    return { error: "Image deletion failed" };
  }
};

export const updateImage = async (
  folderName: string,
  existingFileId: string,
  formData: FormData,
  id?: string
): Promise<UploadResponse> => {
  const deleteResponse = await deleteImage(existingFileId, id);
  if (deleteResponse.error) {
    return { error: deleteResponse.error };
  }

  return await uploadImages(folderName, formData);
};
