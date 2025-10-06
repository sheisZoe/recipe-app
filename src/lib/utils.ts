import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(
  amount: number,
  currency: string,
  fractionDigits: number = 2
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    currencyDisplay: "symbol",
  }).format(toKobo(amount));
}

export function toKobo(amountInNaira: number) {
  return amountInNaira * 100;
}

export function normalizeFilters(
  params: Record<string, any>
): FilterItemsProps {
  const normalizeArray = (val?: string | string[]) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.split(",").map((s) => s.trim());
  };

  const normalizeNumberArray = (val?: string | string[]) => {
    if (!val) return [];
    const arr = Array.isArray(val) ? val : val.split(",");
    return arr.map((s) => Number(s.trim())).filter((n) => !isNaN(n));
  };

  return {
    cuisine: normalizeArray(params.cuisine),
    search: normalizeArray(params.search),
    meal: normalizeArray(params.meal),
    level: normalizeArray(params.level),
    prepRange: normalizeNumberArray(params.prepRange),
    cookRange: normalizeNumberArray(params.cookRange),
  };
}
