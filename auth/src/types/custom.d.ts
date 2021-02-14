import { Customer } from '../models/customer.model';

declare global {
  namespace Express {
    export interface Request {
      payload: any;

      customer: Customer;
    }
  }
}
