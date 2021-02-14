/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import {
  IsEnum, IsNumber, IsString, ValidateNested
} from 'class-validator';
import { PizzaSize } from '../models/pizza-size.enum';

export class PizzaOrderDto {
  @IsNumber()
  pizzaId: number;

  @IsNumber()
  quantity: number;

  @IsEnum(PizzaSize)
  size: PizzaSize;
}

export class PutOrderDto {
  @IsString()
  address: string;

  @Type(() => PizzaOrderDto)
  @ValidateNested()
  pizzaList: PizzaOrderDto[];
}
