import { cn } from "@/lib/utils";

export function Explore() {
  return (
    <div className="flex flex-col gap-4">
      <div className=" flex justify-center">
        <h1 className="text-center text-4xl leading-relaxed capitalize md:text-6xl md:w-1/2">
          Explore how our recipe wonderland works!
        </h1>
      </div>
      <div className=" grid md:grid-cols-3 gap-4 md:gap-8 px-4">
        {data.map((e, i) => (
          <div
            className={cn(
              "flex flex-col gap-4",
              i == 1 && "flex-col-reverse mt-20 md:mt-32"
            )}
            key={e.id}
          >
            <div className="w-full h-40 md:h-80 rounded-xl">
              <img
                src={e.image}
                alt={e.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-primary text-4xl">{e.id}</h2>
              <h1 className="text-xl md:text-3xl font-medium">{e.title}</h1>
              <p className=" w-[70%]">{e.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    id: "01",
    title: "Find Recipes",
    des: "Choose from a wide range of recipes for all preferences and diets.",
    image: "/explore3.jpg",
  },
  {
    id: "02",
    title: "Order ingredients online",
    des: "Choose from a wide range of recipes for all preferences and diets.",
    image: "/explore2.jpg",
  },
  {
    id: "03",
    title: "Cooking and enjoyment",
    des: "Choose from a wide range of recipes for all preferences and diets.",
    image: "/explore1.jpg",
  },
];
