import { PopoverCard } from "@/components/shared/popover-card";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductTags } from "./tags";
import { UseFormReturn } from "react-hook-form";
import { ProductFormInput } from "@/lib/validators/product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductGeneralInfoProps {
  form: UseFormReturn<ProductFormInput>;
}

export function ProductGeneralInfo(props: ProductGeneralInfoProps) {
  const { form } = props;
  return (
    <div className=" flex flex-col gap-4">
      <Card className=" py-4">
        <div className=" border-b border-border px-4 pb-4 space-y-4">
          <h4 className=" text-base md:text-lg text-muted-foreground font-bold">
            General Information
          </h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4 px-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" gap-1 flex flex-col">
                <FormLabel>Recipy Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Recipy name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cuisine</FormLabel>
                <Input placeholder="Cuisine" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem className=" gap-1 flex flex-col">
                <div className=" flex gap-2">
                  <FormLabel>Recipe Tags</FormLabel>
                  <PopoverCard
                    title="Recipe tags"
                    des="Add unique tags that can describe the product"
                  />
                </div>
                <FormControl>
                  <ProductTags form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Difficulty Level</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full min-h-12">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Levels</SelectLabel>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
