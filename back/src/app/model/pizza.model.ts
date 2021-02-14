import {IngredientModel} from './ingredient.model';

export interface PizzaModel {
    id: number;
    name: string;
    basePrice: number;
    ingredients?: IngredientModel[];
}

