import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ImageType, ProductFormInput } from "@/lib/validators/product";
import { Card } from "@/components/ui/card";
import ImageUploaderContainer from "@/components/media/ImageUploaderContainer";
import { useState } from "react";

interface ProductAdditionalInfoProps {
  form: UseFormReturn<ProductFormInput>;
}

export function ProductAdditionalInfo(props: ProductAdditionalInfoProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const { form } = props;
  form.watch();
  return (
    <div className="space-y-4">
      <Card className="w-full gap-0 py-0">
        <div className=" border-b border-border px-4 py-4">
          <h4 className=" text-base md:text-lg text-muted-foreground font-bold">
            Images
          </h4>
        </div>
        <div>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="">
                <ImageUploaderContainer
                  folderName="products"
                  productName={form.getValues("name")}
                  type={"product"}
                  max={1}
                  images={images}
                  saveImages={(data) => {
                    setImages(data);
                    form.setValue("images", [...images, ...data]);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
