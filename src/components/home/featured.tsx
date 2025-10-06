"use client";
import { HomeData } from "@/actions/home";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

interface ProductsProps {
  featured: HomeData["featured"];
}

export function Featured({ featured }: ProductsProps) {
  const router = useRouter();
  return (
    <div className=" flex flex-col gap-4 md:gap-6">
      <div className="flex justify-between items-center px-4 gap-4 md:gap-16">
        <h1 className=" text-md md:text-xl font-medium">Trending Cuisines</h1>
        <Link href={"/recipies"} className="flex gap-2 items-center">
          <span>View All</span>
          <ChevronRight />
        </Link>
      </div>
      <div className=" px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {featured?.map((p, i) => (
          <Card
            key={p.id}
            onClick={() => {
              router.push(`/recipies?cuisine=${p.name}`);
            }}
            style={{ backgroundImage: `url(${p.image[0].url})` }}
            className={cn(
              " h-60 bg-cover min-w-20 text-white bg-center rounded-xl bg-no-repeat flex p-0",
              i == 1 && " md:col-span-2 md:row-span-2 h-full",
              i == 1 && " row-span-2 h-full md:row-span-1",
              i == 3 && "col-span-2"
            )}
          >
            <div className="bg-gradient-to-t from-black/60 to-black/5 relative flex-1 rounded-xl flex items-end p-4">
              <div className="flex w-full justify-between items-center">
                <h4 className="text-xl font-semibold font-sans">
                  {p.name} Cuisines
                </h4>
                <div className="p-2 rounded-full bg-card">
                  <ArrowRight className="text-primary" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
