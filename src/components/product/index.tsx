"use client";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Products } from "@/actions/product";

interface Props {
  data: Products[0];
  className?: string;
}

export function Product({ data, className }: Props) {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/recipies/${data.id}`);
      }}
      style={{ backgroundImage: `url(${data.image[0].url})` }}
      className={cn(
        " h-60 bg-cover min-w-20 text-white bg-center rounded-xl bg-no-repeat flex p-0",
        className
      )}
    >
      <div className="bg-black/40 relative flex-1 rounded-xl flex flex-col justify-end p-4">
        <div className=" flex justify-between">
          <h4 className="text-xl font-medium">{data.name}</h4>
          <div className=" absolute top-2 right-2 p-2 bg-gray-500 rounded-full">
            <Heart />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm line-clamp-1 ">{data.description}</p>
        </div>
      </div>
    </Card>
  );
}
