import { Bookmark, Search } from "lucide-react";
import { Toggle } from "../theme/toggle";
import Link from "next/link";
import { SearchHeader } from "./search";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className=" text-white flex flex-col gap-4">
      <div className="flex-1 flex gap-4 justify-between">
        <Link href={"/"}>
        <h1 className=" text-green-500 uppercase text-2xl md:text-4xl font-bold">
          Recipy
        </h1>
      </Link>
      <SearchHeader className="hidden md:flex" />
      <div className="flex gap-4 items-center">
        <Toggle />
        <Link href={"/upload"}>
          <Button className=" p-6 py-3 rounded border border-border">
            Upload
          </Button>
        </Link>
      </div>
      </div>
      <SearchHeader className=" md:hidden w-full" />
    </header>
  );
}
