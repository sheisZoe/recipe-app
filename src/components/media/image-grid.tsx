import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ImageCard } from "./image-card";
import { UploadPlaceholder } from "./upload-placeholder";
import { ExportInterface } from "react-images-uploading/dist/typings";
import { ImageType } from "@/lib/validators/product";

interface Props extends ExportInterface {
  images: ImageType[];
  max: number;
  type?: "product" | "local";
  loading: boolean;
  deleting: boolean;
  productName?: string;
  folderName: string;
  containerClassName?: string;
  handleDelete: (fileId: string, id?: string) => void;
  className?: string;
  textClassName?: string;
  onClick?: (i: number) => void;
}

export function ImageGrid({
  images,
  max,
  type,
  loading,
  deleting,
  productName,
  folderName,
  handleDelete,
  onImageUpload,
  isDragging,
  dragProps,
  className,
  textClassName,
  containerClassName,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3",
        type === "local" && "sm:grid-cols-1 md:grid-cols-1",
        containerClassName
      )}
    >
      {images?.map((img, i) => (
        <ImageCard
          key={img.fileId}
          image={img}
          type={type}
          onClick={() => onClick?.(i)}
          loading={loading}
          deleting={deleting}
          handleDelete={handleDelete}
        />
      ))}

      {Array.from({ length: max - images?.length }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full bg-muted" />
      ))}

      {images?.length < max && (
        <UploadPlaceholder
          onImageUpload={onImageUpload}
          isDragging={isDragging}
          dragProps={dragProps}
          loading={loading}
          productName={productName}
          type={type}
          className={className}
          textClassName={textClassName}
        />
      )}
    </div>
  );
}
