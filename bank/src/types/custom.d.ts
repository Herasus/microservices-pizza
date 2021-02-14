import { JwtUser } from '../models/jwt-user';

declare global {
  namespace Express {
    export interface Request {
      payload: any;

      user: JwtUser;
    }
  }
}
