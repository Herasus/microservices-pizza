import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { authService } from '../include';
import { JwtUser } from '../models/jwt-user';

const authMiddleware = (withAdmin = false) => async (req: Request, res: Response, next: NextFunction) => {
  const method = (req.headers.authorization || '').split(' ')[0] || '';
  const jwt = (req.headers.authorization || '').split(' ')[1] || '';

  if (method === 'Bearer') {
    // Check the JWT token
    try {
      let jwtUser = await authService.getUser(jwt) as JwtUser;
      if (withAdmin && !jwtUser.isAdmin) {
        throw new Error();
      }
      req.user = jwtUser;
    } catch (e) {
      throw new createHttpError.Unauthorized(e.message);
    }

    next();

    return;
  }

  throw new createHttpError.Unauthorized();
};

export default authMiddleware;
