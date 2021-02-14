import { IsEnum } from 'class-validator';
import { OrderState } from '../models/order-state.enum';

export class SetOrderStateDto {
  @IsEnum(OrderState)
  state: OrderState;
}
