import { Ingredient } from './ingredient.model';

export interface Pizza {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  ingredients: Ingredient[];
}
