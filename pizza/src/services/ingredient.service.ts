import { SetIngredientDto } from '../dto/set-ingredient.dto';
import { IngredientProviderInterface } from '../providers/ingredient.provider';

export class IngredientService {
  constructor(private readonly ingredientProvider: IngredientProviderInterface) { }

  getIngredients() {
    return this.ingredientProvider.findAll();
  }

  getIngredient(ingredientId: number) {
    return this.ingredientProvider.findOne(ingredientId);
  }

  createIngredient(ingredient: SetIngredientDto) {
    return this.ingredientProvider.create(ingredient);
  }

  updateIngredient(ingredientId: number, ingredient: SetIngredientDto) {
    return this.ingredientProvider.update(ingredientId, ingredient);
  }

  deleteIngredient(ingredientId: number) {
    return this.ingredientProvider.delete(ingredientId);
  }

  setIngredientPath(ingredientId: number, path: string) {
    return this.ingredientProvider.setPath(ingredientId, path);
  }
}
