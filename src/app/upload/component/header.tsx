"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader, Upload } from "lucide-react";
import Link from "next/link";

interface ProductEditHeaderProps {
  loading: boolean;
}

export function ProductEditHeader(props: ProductEditHeaderProps) {
  const { loading } = props;
  return (
    <div>
      <Card className="px-4 mt-2 bg-card flex flex-row items-center gap-3 py-3 justify-between">
        <div className="flex md:flex-row flex-col-reverse md:items-center gap-1 md:gap-3">
          <Link
            href={"/recipies"}
            className=" p-2 flex h-fit justify-center items-center rounded-md border border-primary shadow"
          >
            <ArrowLeft className=" w-5 h-5" />
          </Link>
          <div>
            <h4 className=" text-base font-bold">Add New Product</h4>
            <span className=" text-xs text-muted-foreground">Back to List</span>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-end md:items-center gap-4">
          <Button size={"sm"} type="submit" className="flex gap-2 items-center">
            {loading ? (
              <Loader className=" w-4 h-4 animate-spin" />
            ) : (
              <Upload className=" w-4 h-4" />
            )}
            <span>Upload Product</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
