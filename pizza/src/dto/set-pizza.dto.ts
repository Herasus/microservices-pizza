import { IsNumber, IsString, Min } from 'class-validator';

export class SetPizzaDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  basePrice: number;

  @IsString()
  description: string;

  @IsNumber({}, { each: true })
  ingredients: number[];
}
