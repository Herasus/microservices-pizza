import { IsNumber, Min } from 'class-validator';

export class RemoveAmountDto {
  @IsNumber()
  @Min(0)
  amount: number;
}
