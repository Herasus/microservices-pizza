import { mysql } from './modules/mysql';
import { IngredientProvider } from './providers/ingredient.provider';
import { PizzaProvider } from './providers/pizza.provider';
import { AuthService } from './services/auth.service';
import { IngredientService } from './services/ingredient.service';
import { PizzaService } from './services/pizza.service';

export const authService = new AuthService();
export const pizzaProvider = new PizzaProvider(mysql);
export const pizzaService = new PizzaService(pizzaProvider);

export const ingredientProvider = new IngredientProvider(mysql);
export const ingredientService = new IngredientService(ingredientProvider);
