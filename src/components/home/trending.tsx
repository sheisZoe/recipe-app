import { HomeData } from "@/actions/home";
import { Product } from "../product";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductsProps {
  trending: HomeData["trending"];
}

export function Trending({ trending }: ProductsProps) {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex justify-between items-center px-4">
        <h1 className=" text-md md:text-xl font-medium">Trending Recipies</h1>
        <Link href={"/recipies"} className="flex gap-2 items-center">
          <span>View All</span>
          <ChevronRight />
        </Link>
      </div>
      <div className=" flex gap-4 overflow-x-scroll w-full pb-4 pl-4">
        {trending?.map((p, i) => (
          <Product
            key={i}
            data={p}
            className="w-[240px] md:w-[280px] shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
