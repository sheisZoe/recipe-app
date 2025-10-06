"use client";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleLike, Products } from "@/actions/product";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  data: Products[0];
  className?: string;
  disableLike?:boolean 
}

export function Product({ data, className, disableLike = false }: Props) {
  const router = useRouter();
  return (
    <Link href={`/recipies/${data.id}`}>
    <Card
      style={{ backgroundImage: `url(${data.image[0].url})` }}
      className={cn(
        " h-60 bg-cover min-w-20 text-white bg-center rounded-xl bg-no-repeat flex p-0",
        className
      )}
    >
      <div className="bg-black/40 relative flex-1 rounded-xl flex flex-col justify-end p-4">
        <div className=" flex justify-between">
          <h4 className="text-xl font-medium">{data.name}</h4>
         {!disableLike && <button onClick={async(e)=> {
            e.preventDefault()
            try {
              const res = await handleLike(data.id)
              if(res){
                router.refresh()
                toast.success(res)
              }
            } catch (error) {
              toast.error(error as string)
            }
          }} className=" absolute top-2 right-2 p-2 bg-black/5 backdrop-blur-xs z-20 rounded-full">
            <Heart className={cn(data?.favorite?.length > 0 && "fill-primary text-primary")} />
          </button>}
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm line-clamp-1 ">{data.description}</p>
        </div>
      </div>
    </Card>
    </Link>
  );
}
