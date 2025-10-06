import { Card } from "../ui/card";

export function IngredientsSection({ ingredients }: { ingredients: string[] }) {
  if (!ingredients?.length) return null;
  return (
    <Card className="p-6 flex flex-col gap-2">
      <h2 className="text-lg md:text-2xl font-semibold">Ingredients</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </Card>
  );
}
