import { ArrowRight } from "lucide-react";
import { Header } from "../shared/header";
import { Button } from "../ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="h-[36rem] md:h-[85dvh] w-full flex relative">
      <img
        src="/banner.jpg"
        alt="banner"
        className="w-full object-cover h-full absolute top-0 left-0"
      />
      <div className="flex-1 flex bg-black/30 z-1">
        <div className="flex-1 flex  flex-col px-4 py-4 md:py-6 gap-4 max-w-[1500px] mx-auto">
          <Header />
          <div className="flex-1 flex text-white flex-col justify-center gap-4 md:gap-6">
            <h1 className=" text-4xl md:text-8xl font-normal font-sans md:w-1/2">
              Cooking Made Fresh and Easy
            </h1>
            <p className="text-lg md:text-xl font-medium md:w-[40%]">
              Discover culinary delights with our platform that only helps you
              find great recipes but also allows youto conveniently orderthe
              requried ingredients.
            </p>
            <Link href={"/recipies"}>
              <Button className=" self-start h-12 rounded-full">
                View Recipes Now{" "}
                <span className="p-2 rounded-full bg-white">
                  <ArrowRight strokeWidth={3} className=" w-6 text-primary" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
