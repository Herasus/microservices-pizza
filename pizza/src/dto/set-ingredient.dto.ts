import { IsString } from 'class-validator';

export class SetIngredientDto {
  @IsString()
  name: string;
}
