"use client";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import Img, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "width" | "height"> & {
  containerClassName?: string;
};

const Image = ({
  className,
  alt,
  loading = "lazy",
  containerClassName,
  ...props
}: Props) => {
  const [isLoading, setLoading] = useState(true);
  return useMemo(
    () => (
      <div
        className={cn(
          "w-full overflow-hidden group transition bg-transparent duration-300 relative h-full object-cover",
          !isLoading && "blur-sm",
          containerClassName
        )}
      >
        <Img
          {...props}
          onLoad={() => setLoading(false)}
          alt={alt || "Background of a beautiful project"}
          fill={true}
          loading={loading}
          decoding="async"
          className={cn(
            " object-cover transition  duration-1000 w-full h-full",
            isLoading ? "blur-sm" : "blur-none",
            className
          )}
        />
      </div>
    ),
    [props]
  );
};

export default Image;
