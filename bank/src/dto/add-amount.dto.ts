import { IsNumber, Min } from 'class-validator';

export class AddAmountDto {
  @IsNumber()
  @Min(0)
  amount: number;
}
