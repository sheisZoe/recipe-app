"use client";
import { use } from "react";
import { Product } from "../product";
import { RelatedProducts } from "@/actions/product";

interface Props {
  relatedPromise: RelatedProducts;
}

export default async function Related({ relatedPromise }: Props) {

  return (
    <div className=" flex gap-4 overflow-x-scroll w-full pb-4 pl-4">
      {relatedPromise?.map((p, i) => (
        <Product key={i} data={p} className="w-[240px] md:w-[280px] shrink-0" />
      ))}
    </div>
  );
}
