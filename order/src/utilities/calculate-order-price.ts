import createHttpError from 'http-errors';
import { PizzaOrderDto } from '../dto/put-order.dto';
import { PizzaSize, pizzaSizeMultiplier } from '../models/pizza-size.enum';
import { Pizza } from '../models/pizza.model';

/**
 * Calculate the price of an order from the list of pizzas
 * @param order
 * @param pizzas
 */
export const calculateOrderPrice = (order: PizzaOrderDto[], pizzas: Pizza[]) => {
  return order.reduce((acc, val) => {
    const pizza = pizzas.find(p => p.id === val.pizzaId);
    if (!pizza) throw new createHttpError.NotFound('Pizza not found');

    return acc + pizza.basePrice * pizzaSizeMultiplier[val.size] * val.quantity;
  }, 0);
};
