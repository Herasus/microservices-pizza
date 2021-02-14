import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { customerProvider } from '../include';
import { verifyToken } from '../services/jwt';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const method = (req.headers.authorization || '').split(' ')[0] || '';
  const jwt = (req.headers.authorization || '').split(' ')[1] || '';

  if (method === 'Bearer') {
    // Check the JWT token
    try {
      let userJwt = verifyToken(jwt);
      const customer = await customerProvider.find(userJwt.id);
      if (!customer) throw new createHttpError.Unauthorized();

      req.customer = customer;
    } catch (e) {
      throw new createHttpError.Unauthorized(e.message);
    }

    next();

    return;
  }

  throw new createHttpError.Unauthorized();
};

export default authMiddleware;
