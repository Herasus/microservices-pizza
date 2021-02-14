import { IsString } from 'class-validator';

export class AuthenticateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
