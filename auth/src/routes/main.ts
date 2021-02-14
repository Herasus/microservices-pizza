import { Express } from 'express';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { RegisterDto } from '../dto/register.dto';
import { authService } from '../include';
import authMiddleware from '../middlewares/auth';
import { validateBody } from '../middlewares/validate-body';
import { customerForPublic } from '../models/customer.model';
import { PayloadRequest } from '../services/express';

export const mainController = (app: Express) => {
  app.post('/auth',
    validateBody(AuthenticateDto),
    async (req: PayloadRequest<AuthenticateDto>, res, next) => {
      const { email, password } = req.payload;
      const token = await authService.authenticate(email, password);

      res.json({
        token,
      });
    });

  app.post('/auth/admin',
    validateBody(AuthenticateDto),
    async (req: PayloadRequest<AuthenticateDto>, res, next) => {
      const { email, password } = req.payload;
      const token = await authService.authenticate(email, password, true);

      res.json({
        token,
      });
    });

  app.post('/refresh',
    authMiddleware,
    validateBody(AuthenticateDto),
    async (req: PayloadRequest<AuthenticateDto>, res, next) => {
      const { email, password } = req.payload;
      const token = await authService.authenticate(email, password);

      res.json({
        token,
      });
    });

  app.get('/profile',
    authMiddleware,
    async (req: PayloadRequest<AuthenticateDto>, res, next) => {
      res.json(customerForPublic(req.customer));
    });

  app.post('/register',
    validateBody(RegisterDto),
    async (req: PayloadRequest<RegisterDto>, res, next) => {
      const user = await authService.register(req.payload);

      res.status(201).end();
    });
};
