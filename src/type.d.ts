interface Product {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface FilterItemsProps {
  meal?: string[];
  cuisine?: string[];
  level?: string[];
  prepRange?: number[];
  cookRange?: number[];
  search?: string[];
}

interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
  data?: boolean;
}
