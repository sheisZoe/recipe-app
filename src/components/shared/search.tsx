"use client";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SuggestedRecipes } from "./suggested";
import { useRouter } from "next/navigation";

export function SearchHeader() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const isTyping = useMemo(() => search?.length > 1, [search]);
  return (
    <div className="flex-1 flex justify-center">
      <div className=" w-1/2 flex relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/recipies?search=${search}`);
            setSearch("");
          }}
          method="GET"
          className={cn(
            "flex w-full gap-2 items-center border-2 shadow backdrop-blur-sm border-border rounded-full py-2 px-4",
            isTyping && "rounded-b-none rounded-t-xl"
          )}
        >
          <span>
            <Search className="w-4 h-4" />
          </span>
          <input
            className="flex-1 focus-visible:outline-none"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </form>
        {isTyping && <SuggestedRecipes search={search} />}
      </div>
    </div>
  );
}
