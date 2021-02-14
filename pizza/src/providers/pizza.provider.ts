import { plainToClass } from 'class-transformer';
import createHttpError from 'http-errors';
import { Ingredient } from '../models/ingredient.model';
import { Pizza } from '../models/pizza.model';
import MySQLHandler from '../modules/mysql-handler';

export type SetPizzaParams = Omit<Pizza, 'id' | 'ingredients' | 'path'> & { ingredients: number[] };

export interface PizzaProviderInterface {
  /**
   * Find all pizzas
   */
  findAll(): Promise<Pizza[]>;

  /**
   * Find one pizza
   * @param pizzaId The pizza id
   */
  findOne(pizzaId: number): Promise<Pizza>;

  /**
   * Create a pizza
   * @param pizza The pizza
   */
  create(pizza: SetPizzaParams): Promise<number>;

  /**
   * Update a pizza
   * @param pizzaId The pizza id
   * @param pizza The pizza
   */
  update(pizzaId: number, pizza: SetPizzaParams): Promise<void>;

  /**
   * Delete a pizza
   * @param pizzaId The pizza id
   */
  delete(pizzaId: number): Promise<void>;

  /**
   * Update the pizza image path
   * @param pizzaId The pizza id
   * @param path The path
   */
  setPath(pizzaId: number, path: string): Promise<void>
}

export class PizzaProvider
implements PizzaProviderInterface {
  private mysql: MySQLHandler;

  constructor(mysql: MySQLHandler) {
    this.mysql = mysql;
  }

  async findAll() {
    const pizzas = await this.mysql.queryPromise(`
      SELECT * FROM Pizza
    `);

    return pizzas.map((rawPizza: any) => plainToClass(Pizza, {
      id: rawPizza.id,
      name: rawPizza.name,
      description: rawPizza.description,
      basePrice: rawPizza.basePrice,
      path: rawPizza.path,
      ingredients: [],
    })) as Pizza[];
  }

  async findOne(pizzaId: number) {
    const data = await this.mysql.queryPromise(`
      SELECT Pizza.id, Pizza.name, Pizza.basePrice, Pizza.path, Pizza.description, Ingredient.id AS ingredientId, Ingredient.name as ingredientName, Ingredient.path AS ingredientPath
      FROM Pizza
        LEFT JOIN PizzaIngredient ON Pizza.id = PizzaIngredient.pizzaId 
        LEFT JOIN Ingredient ON Ingredient.id = PizzaIngredient.ingredientId 
      WHERE Pizza.id = :id
    `, { id: pizzaId });

    if (data.length === 0) {
      throw new createHttpError.NotFound('Pizza not found');
    }

    const rawPizza = data[0];

    const ingredients: Ingredient[] = data.map((ingredient: any) => plainToClass(Ingredient, {
      id: ingredient.ingredientId,
      name: ingredient.ingredientName,
      path: ingredient.ingredientPath,
    }));

    const pizza = plainToClass(Pizza, {
      id: rawPizza.id,
      name: rawPizza.name,
      description: rawPizza.description,
      basePrice: rawPizza.basePrice,
      path: rawPizza.path,
      ingredients,
    });

    return pizza;
  }

  async create(pizza: SetPizzaParams) {
    // Create the pizza
    const { insertId } = await this.mysql.queryPromise(`
      INSERT INTO Pizza
      SET name = :name,
      basePrice = :basePrice,
      path = '',
      description = :description`,
    {
      name: pizza.name,
      basePrice: pizza.basePrice,
      description: pizza.description,
    });

    // Set ingredients
    await this.setIngredients(insertId, pizza.ingredients);

    return insertId;
  }

  async update(pizzaId: number, pizza: SetPizzaParams) {
    // Update the pizza
    await this.mysql.queryPromise(`
      UPDATE Pizza
      SET name = :name,
      basePrice = :basePrice,
      description = :description
      WHERE id = :id`,
    {
      name: pizza.name,
      basePrice: pizza.basePrice,
      description: pizza.description,
      id: pizzaId,
    });

    // Set ingredients
    await this.setIngredients(pizzaId, pizza.ingredients);
  }

  async delete(pizzaId: number) {
    await this.mysql.queryPromise(`
      DELETE FROM Pizza
      WHERE id = :id
    `, {
      id: pizzaId,
    });
  }

  async setPath(pizzaId: number, path: string) {
    await this.mysql.queryPromise(`
      UPDATE Pizza
      SET path = :path
      WHERE id = :pizzaId
    `, {
      pizzaId, path,
    });
  }

  /**
   * Update pizza ingredients
   * @param id The pizza id
   * @param ingredients A list of ingredient ids
   */
  private async setIngredients(id: number, ingredients: number[]) {
    // Delete all ingredients
    await this.mysql.queryPromise(`
      DELETE FROM PizzaIngredient WHERE pizzaId = :id
     `, {
      id
    });

    // Set ingredients
    let promises = ingredients.map(ingredientId => this.mysql.queryPromise(`
      INSERT INTO PizzaIngredient SET pizzaId = :pizzaId, ingredientId = :ingredientId
    `, { pizzaId: id, ingredientId, }));

    await Promise.all(promises);
  }
}
