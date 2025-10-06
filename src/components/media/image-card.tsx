import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import Image from "@/components/media/image";
import { ImageType } from "react-images-uploading";

interface Props {
  image: ImageType;
  type?: "product" | "local";
  loading: boolean;
  deleting: boolean;
  onClick: () => void;
  handleDelete: (fileId: string, id?: string) => void;
}

export function ImageCard({
  image,
  type,
  loading,
  deleting,
  handleDelete,
  onClick,
}: Props) {
  return (
    <div className="w-full h-[150px] bg-muted border relative rounded-md overflow-hidden">
      <Image
        src={image.url}
        alt="Uploaded image"
        onClick={onClick}
        className="object-cover w-full h-full"
      />
      {type !== "local" && (
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleDelete(image.fileId, image?.id)}
            disabled={loading || deleting}
          >
            {deleting ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <Trash2 />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
