import { Card } from "../ui/card";

export function InstructionsSection({
  instructions,
}: {
  instructions: string[];
}) {
  if (!instructions?.length) return null;
  return (
    <Card className="p-6 flex flex-col gap-3">
      <h2 className="text-lg md:text-2xl font-semibold">Instructions</h2>
      <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base">
        {instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </Card>
  );
}
