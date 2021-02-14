import { plainToClass, Type } from 'class-transformer';
import { OrderState } from './order-state.enum';
import { PizzaOrder } from './pizza-order.model';

export class CustomerOrder {
  id: number;

  state: OrderState;

  orderDate: Date;

  deliveryDate: Date | null;

  totalPrice: number;

  address: string;

  @Type(() => PizzaOrder)
  pizzas: PizzaOrder[];

  userId: number;
}
