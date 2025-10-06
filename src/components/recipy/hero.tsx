import { Product } from "@/actions/product";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface Props {
  data: Product;
}

export function RecipyHero({ data }: Props) {
  if (!data) return null;
  return (
    <Card className=" border border-border p-4 md:p-8 grid md:grid-cols-3 gap-4">
      <div className=" flex flex-col gap-4">
        <h1 className="text-xl md:text-3xl font-semibold">{data.name}</h1>
        <p className=" text-sm">
          {data.description}
        </p>
        <div className="self-end flex gap-4 flex-wrap mt-auto">
          {data.tags?.map((t) => (
            <Badge
              variant={"outline"}
              className="p-2 rounded-full px-6 border-primary"
              key={t}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <div className="w-60 md:w-80 mx-auto aspect-square rounded-full">
        <img
          src={data.image[0].url}
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>
      <div className="flex justify-between gap-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Prep Time</p>
            <p className="text-sm text-muted-foreground">
              {data.prepTimeMinutes} mins
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Cook Time</p>
            <p className="text-sm text-muted-foreground">
              {data.cookTimeMinutes} mins
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Cuisine</p>
            <Badge>{data.name}</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Servings</p>
            <p className="text-sm text-muted-foreground">{data.servings}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Difficulty Level</p>
            <p className="text-sm text-muted-foreground">{data.difficulty}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Per serving</p>
            <span className="text-sm text-muted-foreground">
              {data.caloriesPerServing} kcal
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
