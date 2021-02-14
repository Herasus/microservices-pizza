import { IsNumber } from 'class-validator';

export class AssignOrderDto {
  @IsNumber()
  deliveryManId: number;

  @IsNumber()
  vehicleId: number;
}
