"use client";
import { use } from "react";
import { Product } from "../product";
import { RelatedProducts } from "@/actions/product";

interface Props {
  relatedPromise: Promise<RelatedProducts>;
}

export default async function Related({ relatedPromise }: Props) {
  const data = use(relatedPromise);
  return (
    <div className=" flex gap-4 overflow-x-scroll w-full pb-4 pl-4">
      {data?.map((p, i) => (
        <Product key={i} data={p} className="w-[240px] md:w-[280px] shrink-0" />
      ))}
    </div>
  );
}
