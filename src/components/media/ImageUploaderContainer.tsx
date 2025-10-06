"use client";

import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { toast } from "sonner";
import {
  uploadImages,
  deleteImage,
  updateImage,
} from "@/hooks/use-image-handler";
import { imageCompressor } from "@mbs-dev/react-image-compressor";
import { Card } from "@/components/ui/card";
import { ImageGrid } from "./image-grid";
import { ImageType } from "@/lib/validators/product";

interface Props {
  saveImages: (images: ImageType[]) => void;
  images: ImageType[];
  folderName: string;
  productName?: string;
  className?: string;
  textClassName?: string;
  loading?: boolean;
  containerClassName?: string;
  type?: "product" | "local";
  max?: number;
  onClick?: (i: number) => void;
}

export default function ImageUploaderContainer({
  saveImages,
  images,
  folderName,
  productName,
  className,
  textClassName,
  type = "product",
  max = 3,
  containerClassName,
  onClick,
  loading: load,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const compressAndPrepareFiles = async (imagesD: ImageListType) => {
    const formData = new FormData();
    await Promise.all(
      imagesD.map(async (image) => {
        if (!image?.file) return;
        const compressed = (await imageCompressor(image.file, 0.5)) as File;
        const name = productName
          ? `${productName.replace(/\s/g, "-")}.webp`
          : `${image.name?.replace(/\s/g, "-")}.webp`;
        formData.append("image", compressed, name);
      })
    );
    return formData;
  };

  const handleUpload = async (imagesD: ImageListType) => {
    setLoading(true);
    try {
      const formData = await compressAndPrepareFiles(imagesD);
      const res = await uploadImages(folderName, formData);
      if (res.error) toast.error(res.error);
      else if (res.data) saveImages([...images, ...res.data]);
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId: string, id?: string) => {
    try {
      setDeleting(true);
      const res = await deleteImage(fileId, id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Image deleted");
        saveImages(images.filter((img) => img.fileId !== fileId));
      }
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (imagesD: ImageListType) => {
    if (!images[0]) return;
    setLoading(true);
    try {
      const formData = await compressAndPrepareFiles(imagesD);
      const res = await updateImage(
        folderName,
        images[0].fileId,
        formData,
        images[0].id
      );
      if (res.error) toast.error(res.error);
      else if (res.data) saveImages(res.data);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-0">
      <ImageUploading
        value={[]}
        onChange={type === "local" ? handleUpdate : handleUpload}
        maxNumber={max - images?.length}
        onError={(err) => {
          if (err?.maxFileSize) toast.error("File too large");
          else if (err?.acceptType) toast.error("Invalid file type");
          else if (err?.maxNumber) toast.error("Too many files");
          else toast.error("Upload error");
        }}
      >
        {(uploadProps) => (
          <ImageGrid
            {...uploadProps}
            images={images}
            max={max}
            type={type}
            loading={load || loading}
            deleting={deleting}
            productName={productName}
            folderName={folderName}
            onClick={onClick}
            handleDelete={handleDelete}
            className={className}
            textClassName={textClassName}
            containerClassName={containerClassName}
          />
        )}
      </ImageUploading>
    </Card>
  );
}
