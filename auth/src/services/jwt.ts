import { plainToClass } from 'class-transformer';
import JWT from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../constants';
import { AppToken } from '../models/app-token';
import { Customer } from '../models/customer.model';

export const verifyToken = (token: string) => {
  return JWT.verify(token, JWT_SECRET) as AppToken;
};

export const generateToken = (user: Customer) => {
  const credentials: AppToken = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    expiration: new Date().getTime() + JWT_EXPIRATION * 1000,
  };
  const token = JWT.sign(credentials, JWT_SECRET);

  return token;
};

export const refreshToken = (token: string) => {
  const decoded = JWT.verify(token, JWT_SECRET);

  return generateToken(plainToClass(Customer, decoded));
};
