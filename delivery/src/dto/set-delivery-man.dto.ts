import { IsString } from 'class-validator';

export class SetDeliveryManDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
