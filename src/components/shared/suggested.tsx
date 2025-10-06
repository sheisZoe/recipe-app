"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import {
  getProducts,
  getSearchSuggested,
  SearchRecipes,
  SearchSuggested,
} from "@/actions/search";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Rating } from "../ui/rating";

interface SuggestedRecipesProps {
  search: string;
}

export function SuggestedRecipes({ search }: SuggestedRecipesProps) {
  const [suggested, setSuggested] = useState<SearchSuggested>();
  const [products, setProducts] = useState<SearchRecipes>([]);

  useEffect(() => {
    async function getSuggestions() {
      const data = await getSearchSuggested();
      if (data) {
        setSuggested(data);
      }
    }
    getSuggestions();
  }, []);
  useEffect(() => {
    async function getSearchProducts() {
      const data = await getProducts(search);
      if (data) {
        setProducts(data);
      }
    }
    getSearchProducts();
  }, [search]);
  return (
    <Card className=" absolute top-full left-0 w-full min-h-96 z-30 rounded-t-none bg-background border-t-0 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm">Cuisines</h4>
          <div className="flex gap-4 overflow-x-scroll py-1">
            {suggested?.cuisines.map((c) => (
              <Link key={c} href={`/recipies?cuisine=${c}`}>
                <Badge variant={"outline"} className=" ">
                  {c}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm">Meal Types</h4>
          <div className="flex gap-4 overflow-x-scroll py-1">
            {suggested?.mealTypes.map((c) => (
              <Link key={c} href={`/recipies?meal=${c}`}>
                <Badge variant={"outline"} className=" ">
                  {c}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {products?.map((p) => (
          <Link key={p.id} href={`/recipies/${p.id}`}>
            <div className="flex gap-2 items-center w-full hover:bg-card/70">
              <div className=" w-12 h-12 rounded-full">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-medium">{p.name}</h2>
                <p className="text-xs text-muted-foreground">{p.cuisine}</p>
              </div>
              <div className="flex flex-col items-center">
                <Rating value={p.rating} readOnly />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
