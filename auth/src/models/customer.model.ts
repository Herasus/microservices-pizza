import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class Customer {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export const customerForPublic = (customer: Customer) => ({
  id: customer.id,
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
  isAdmin: customer.isAdmin,
});
