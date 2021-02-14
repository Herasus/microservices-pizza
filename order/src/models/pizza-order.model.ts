import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { PizzaSize } from './pizza-size.enum';

export class PizzaOrder {
  @IsNumber()
  pizzaId: number;

  @IsEnum(PizzaSize)
  size: PizzaSize;

  @IsNumber()
  quantity: number;
}
