import { IsString } from 'class-validator';

export class SetVehicleDto {
  @IsString()
  type: string;

  @IsString()
  plate: string;
}
