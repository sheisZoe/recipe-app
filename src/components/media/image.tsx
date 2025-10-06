"use client";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import Img, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "width" | "height"> & {
  className?: string;
  src: string;
  alt: string;
  scale?: boolean;
  zoomIn?: boolean;
  loading?: "lazy" | "eager" | undefined;
  containerClassName?: string;
};

const Image = ({
  className,
  src,
  alt,
  scale,
  loading = "lazy",
  zoomIn,
  containerClassName,
  ...props
}: Props) => {
  const [isLoading, setLoading] = useState(true);
  return useMemo(
    () => (
      <div
        className={cn(
          "w-full overflow-hidden group transition bg-transparent duration-300 relative h-full object-cover",
          !src && "blur-sm",
          containerClassName
        )}
      >
        {src && (
          <Img
            {...props}
            src={src}
            onLoad={() => setLoading(false)}
            alt={alt || "Background of a beautiful project"}
            fill={true}
            loading={loading}
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            className={cn(
              " object-cover transition  duration-1000 w-full h-full",
              isLoading ? "blur-sm" : "blur-none",
              scale && "group-hover:scale-110 transition-all duration-3000",
              zoomIn && "group-hover:scale-90 group-hover:object-scale-contain",
              className
            )}
          />
        )}
      </div>
    ),
    [props]
  );
};

export default Image;
