import { Ingredient } from './ingredient.model';

export class Pizza {
  id: string;

  name: string;

  basePrice: number;

  description: string;

  ingredients: Ingredient[];

  path: string;
}
