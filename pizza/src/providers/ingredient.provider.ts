import { plainToClass } from 'class-transformer';
import createHttpError from 'http-errors';
import { Ingredient } from '../models/ingredient.model';
import MySQLHandler from '../modules/mysql-handler';

export type SetIngredientParams = Omit<Ingredient, 'id' | 'path'>;

export interface IngredientProviderInterface {
  /**
   * Find all ingredients
   */
  findAll(): Promise<Ingredient[]>;

  /**
   * Find an ingredient
   * @param ingredientId The ingredient id
   */
  findOne(ingredientId: number): Promise<Ingredient>

  /**
   * Create an ingredient
   * @param ingredient The ingredient
   */
  create(ingredient: SetIngredientParams): Promise<number>;

  /**
   * Update an ingredient
   * @param ingredientId The ingredient id
   * @param ingredient The ingredient
   */
  update(ingredientId: number, ingredient: SetIngredientParams): Promise<void>;

  /**
   * Delete an ingredient
   * @param ingredientId The ingredient id
   */
  delete(ingredientId: number): Promise<void>;

  /**
   * Update an ingredient image path
   * @param ingredientId The ingredient id
   * @param path The path
   */
  setPath(ingredientId: number, path: string): Promise<void>;
}

export class IngredientProvider
implements IngredientProviderInterface {
  private mysql: MySQLHandler;

  constructor(mysql: MySQLHandler) {
    this.mysql = mysql;
  }

  async findAll() {
    const raw = await this.mysql.queryPromise(`
      SELECT * FROM Ingredient 
    `);

    return raw.map((ingredient: any) => plainToClass(Ingredient, ingredient)) as Ingredient[];
  }

  async findOne(ingredientId: number) {
    const raw = await this.mysql.oneQueryPromise(`
      SELECT * FROM Ingredient
      WHERE id = :id
    `, { id: ingredientId });

    if (!raw) throw new createHttpError.NotFound('Ingredient not found');

    return plainToClass(Ingredient, raw) as Ingredient;
  }

  async create(ingredient: SetIngredientParams) {
    const { insertId } = await this.mysql.queryPromise(`
      INSERT INTO Ingredient
      SET name = :name,
      path = ''
    `, {
      name: ingredient.name,
    });

    return +insertId;
  }

  async update(ingredientId: number, ingredient: SetIngredientParams) {
    await this.mysql.queryPromise(`
      UPDATE Ingredient
      SET name = :name
      WHERE id = :id
    `, {
      id: ingredientId,
      name: ingredient.name,
    });
  }

  async delete(ingredientId: number) {
    await this.mysql.queryPromise(`
      DELETE FROM Ingredient
      WHERE id = :id
    `, { id: ingredientId });
  }

  async setPath(ingredientId: number, path: string) {
    await this.mysql.queryPromise(`
      UPDATE Ingredient
      SET path = :path
      WHERE id = :ingredientId
    `, {
      ingredientId, path,
    });
  }
}
