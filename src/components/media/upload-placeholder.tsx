import { Card } from "@/components/ui/card";
import { ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  onImageUpload: () => void;
  isDragging: boolean;
  dragProps: any;
  loading: boolean;
  productName?: string;
  type?: "product" | "local";
  className?: string;
  textClassName?: string;
}

export function UploadPlaceholder({
  onImageUpload,
  isDragging,
  dragProps,
  loading,
  productName,
  type,
  className,
  textClassName,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        if (type === "product" && !productName) {
          toast.warning("Product name is required");
          return;
        }
        onImageUpload();
      }}
      disabled={loading}
      className={cn("flex items-center gap-2", isDragging && "text-red-500")}
      {...dragProps}
    >
      <Card
        className={cn(
          "h-40 border-primary relative w-full flex flex-col items-center justify-center rounded-md border p-1 cursor-pointer hover:bg-muted/50",
          className
        )}
      >
        <div className="p-3 rounded-full bg-muted">
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <ImageIcon />
          )}
        </div>
        <div
          className={cn(
            "text-sm mt-2 flex flex-col justify-center text-center",
            textClassName
          )}
        >
          <span> Drag or Click</span>
          <span className="text-primary text-xs"> to browse</span>
        </div>
      </Card>
    </button>
  );
}
