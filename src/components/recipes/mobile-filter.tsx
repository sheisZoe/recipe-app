"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RangeSlider } from "./filter";
import { use, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card } from "../ui/card";
import { FilterData } from "@/actions/product";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";

interface FilterProps {
  filterDataPromise: Promise<FilterData>;
  params: FilterItemsProps;
}

export function MobileFilter({ filterDataPromise, params }: FilterProps) {
  const { cookRange, prepRange, cuisines, mealTypes } = use(filterDataPromise);
  const [filter, setFilter] = useState<FilterItemsProps>({});
  const [filtering, setfiltering] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateURL(filter: FilterItemsProps) {
    setfiltering(true);
    const params = new URLSearchParams(searchParams);

    const safeJoin = (val?: string[] | string) =>
      Array.isArray(val) ? val.join(",") : val ? String(val) : undefined;

    if (safeJoin(filter.cuisine)) {
      params.set("cuisine", safeJoin(filter.cuisine)!);
    } else {
      params.delete("cuisine");
    }

    if (safeJoin(filter.meal)) {
      params.set("meal", safeJoin(filter.meal)!);
    } else {
      params.delete("meal");
    }

    if (safeJoin(filter.level)) {
      params.set("level", safeJoin(filter.level)!);
    } else {
      params.delete("level");
    }
    if (safeJoin(filter.search)) {
      params.set("search", safeJoin(filter.search)!);
    } else {
      params.delete("search");
    }

    if (Array.isArray(filter.prepRange) && filter.prepRange.length === 2) {
      params.set("prepRange", filter.prepRange.join(","));
    } else {
      params.delete("prepRange");
    }

    if (Array.isArray(filter.cookRange) && filter.cookRange.length === 2) {
      params.set("cookRange", filter.cookRange.join(","));
    } else {
      params.delete("cookRange");
    }

    const newUrl = `${pathname}?${params.toString()}`;

    // 🚀 Prevent unnecessary replace (avoid infinite loop)
    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      replace(newUrl, { scroll: false });
    }
  }

  function ensureArray(val?: string | string[]): string[] {
    if (!val) return [];
    return Array.isArray(val)
      ? val
      : String(val)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
  }

  function parseRange(val?: string | number[]): number[] {
    if (!val) return [];
    if (Array.isArray(val))
      return val.map(Number).filter((n) => !Number.isNaN(n));
    return String(val)
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n));
  }
  useEffect(() => {
    if (params && !filtering) {
      updateURL({
        ...params,
        cuisine: ensureArray(params.cuisine),
        search: ensureArray(params.search),
        meal: ensureArray(params.meal),
        level: ensureArray(params.level),
        prepRange: parseRange(params.prepRange),
        cookRange: parseRange(params.cookRange),
      });
      setFilter({
        ...params,
        cuisine: ensureArray(params.cuisine),
        search: ensureArray(params.search),
        meal: ensureArray(params.meal),
        level: ensureArray(params.level),
        prepRange: parseRange(params.prepRange),
        cookRange: parseRange(params.cookRange),
      });
    }
  }, [params]);

  return (
    <Drawer direction="right">
      <DrawerTrigger className="md:hidden">
        <ListFilter />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className=" overflow-y-auto p-4 min-h-[60dvh] h-fit sticky top-4 space-y-1">
          {/* Cuisine */}
          <div className="space-y-1">
            <h2 className="text-sm md:text-md font-semibold">Cuisines</h2>
            <div
              className={cn(
                "flex flex-col gap-2 py-2 overflow-y-scroll scroll-smooth",
                cuisines?.length > 10 ? "h-32" : "h-12"
              )}
            >
              {cuisines
                ?.slice() // copy so we don’t mutate
                .sort((a, b) => {
                  const aChecked = filter.cuisine?.includes(a) ? 1 : 0;
                  const bChecked = filter.cuisine?.includes(b) ? 1 : 0;
                  return bChecked - aChecked; // checked first
                })
                .map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <Checkbox
                      checked={filter.cuisine?.includes(c)}
                      onCheckedChange={(checked) => {
                        const prev = Array.isArray(filter.cuisine)
                          ? filter?.cuisine
                          : [];
                        const next = checked
                          ? [...prev, c]
                          : prev?.filter((v) => v !== c);
                        setFilter((old) => {
                          updateURL({ ...old, cuisine: next });
                          return { ...old, cuisine: next };
                        });
                      }}
                      id={c}
                    />
                    <Label className="text-sm font-light" htmlFor={c}>
                      {c}
                    </Label>
                  </div>
                ))}
            </div>
          </div>

          {/* Meal Type */}
          <div className="space-y-1">
            <h2 className="text-sm md:text-md font-semibold">Meal Type</h2>
            <div
              className={cn(
                "flex flex-col gap-2 py-2 overflow-y-scroll scroll-smooth",
                mealTypes?.length > 10 ? "h-40" : "h-28"
              )}
            >
              {mealTypes
                ?.slice() // copy so we don’t mutate
                .sort((a, b) => {
                  const aChecked = filter.meal?.includes(a) ? 1 : 0;
                  const bChecked = filter.meal?.includes(b) ? 1 : 0;
                  return bChecked - aChecked; // checked first
                })
                .map((m) => (
                  <div key={m} className="flex items-center gap-2">
                    <Checkbox
                      checked={filter.meal?.includes(m)}
                      onCheckedChange={(checked) => {
                        const prev = Array.isArray(filter.meal)
                          ? filter?.meal
                          : [];
                        const next = checked
                          ? [...prev, m]
                          : prev?.filter((v) => v !== m);
                        setFilter((old) => {
                          updateURL({ ...old, meal: next });
                          return { ...old, meal: next };
                        });
                      }}
                      id={m}
                    />
                    <Label className="text-sm font-light" htmlFor={m}>
                      {m}
                    </Label>
                  </div>
                ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-1">
            <h2 className="text-sm md:text-md font-semibold">
              Difficulty Level
            </h2>
            <div className="flex flex-col gap-2 py-2">
              {["Easy", "Medium", "Hard"].map((lvl) => (
                <div key={lvl} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter.level?.includes(lvl)}
                    onCheckedChange={(checked) => {
                      const prev = Array.isArray(filter.level)
                        ? filter?.level
                        : [];
                      const next = checked
                        ? [...prev, lvl]
                        : prev?.filter((v) => v !== lvl);
                      setFilter((old) => {
                        updateURL({ ...old, level: next });
                        return { ...old, level: next };
                      });
                    }}
                    id={lvl}
                  />
                  <Label className="text-sm font-light" htmlFor={lvl}>
                    {lvl}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Prep Range */}
          <RangeSlider
            title="Preparation Duration"
            min={prepRange[0]}
            max={prepRange[1]}
            range={filter.prepRange ?? prepRange}
            setRange={(val) =>
              setFilter((old) => {
                updateURL({ ...old, prepRange: val });
                return { ...old, prepRange: val };
              })
            }
          />

          {/* Cook Range */}
          <RangeSlider
            title="Cooking Duration"
            min={cookRange[0]}
            max={cookRange[1]}
            range={filter.cookRange ?? cookRange}
            setRange={(val) =>
              setFilter((old) => {
                updateURL({ ...old, cookRange: val });
                return { ...old, cookRange: val };
              })
            }
          />
        </div>
        <DrawerFooter className=" flex flex-row gap-4">
          <Button
            onClick={() => {
              setFilter({});
              updateURL({});
            }}
            className="flex-1"
          >
            Reset All
          </Button>
          <DrawerClose className="flex-1">
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
