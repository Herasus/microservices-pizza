import { SetPizzaDto } from '../dto/set-pizza.dto';
import { PizzaProviderInterface } from '../providers/pizza.provider';

export class PizzaService {
  constructor(private readonly pizzaProvider: PizzaProviderInterface) { }

  getPizzas() {
    return this.pizzaProvider.findAll();
  }

  getPizza(pizzaId: number) {
    return this.pizzaProvider.findOne(pizzaId);
  }

  createPizza(pizza: SetPizzaDto) {
    return this.pizzaProvider.create(pizza);
  }

  updatePizza(pizzaId: number, pizza: SetPizzaDto) {
    return this.pizzaProvider.update(pizzaId, pizza);
  }

  deletePizza(pizzaId: number) {
    return this.pizzaProvider.delete(pizzaId);
  }

  setPizzaPath(pizzaId: number, path: string) {
    return this.pizzaProvider.setPath(pizzaId, path);
  }
}
