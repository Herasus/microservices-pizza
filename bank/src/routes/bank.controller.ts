import { Express } from 'express';
import { AddAmountDto } from '../dto/add-amount.dto';
import { RemoveAmountDto } from '../dto/remove-amount.dto';
import { userBalanceService } from '../include';
import authMiddleware from '../middlewares/auth';
import basicAuthMiddleware from '../middlewares/basic-auth';
import { validateBody } from '../middlewares/validate-body';

export const bankController = (app: Express) => {
  // Returns the user balance
  app.get('/user/balance', authMiddleware, async (req, res) => {
    const balance = await userBalanceService.getUserBalance(+req.user.id);

    res.json({ balance });
  });

  // Returns the user balance
  app.get('/balance/:userId', basicAuthMiddleware, async (req, res) => {
    const balance = await userBalanceService.getUserBalance(+req.params.userId);

    res.json({ balance });
  });

  // Add amount
  app.post('/user/balance/add', authMiddleware, validateBody(AddAmountDto), async (req, res) => {
    await userBalanceService.addAmount(+req.user.id, +req.payload.amount);

    res.status(204).end();
  });

  // Removes amount
  app.post('/balance/:userId/remove', basicAuthMiddleware, validateBody(RemoveAmountDto), async (req, res) => {
    await userBalanceService.removeAmount(+req.params.userId, +req.payload.amount);

    res.status(204).end();
  });
};
