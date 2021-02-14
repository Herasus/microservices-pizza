export interface Ingredient {
  id: number;
  name: string;
  path: string;
}

export interface Pizza {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  ingredients: Ingredient[];
}
