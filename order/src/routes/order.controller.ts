import { Express } from 'express';
import { PutOrderDto } from '../dto/put-order.dto';
import { SetOrderStateDto } from '../dto/set-order-state.dto';
import { orderService } from '../include';
import authMiddleware from '../middlewares/auth';
import basicAuthMiddleware from '../middlewares/basic-auth';
import { validateBody } from '../middlewares/validate-body';
import { AppRequest } from '../services/express';

export const orderController = (app: Express) => {
  app.post('/orders', authMiddleware(), validateBody(PutOrderDto), async (req, res) => {
    await orderService.placeOrder(req.user.id, req.payload);

    res.status(204).end();
  });

  app.get('/orders', authMiddleware(), async (req, res) => {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.json(orders);
  });

  app.get('/admin/orders/:orderId', authMiddleware(true), async (req, res) => {
    const orders = await orderService.getOrder(+req.params.orderId);
    res.json(orders);
  });

  app.get('/admin/orders', authMiddleware(true), async (req, res) => {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  });

  app.post('/admin/orders/:orderId/state', basicAuthMiddleware,
    validateBody(SetOrderStateDto),
    async (req: AppRequest<{ orderId: string }, SetOrderStateDto>, res) => {
      const orders = await orderService.setOrderState(+req.params.orderId, req.payload.state);
      res.json(orders);
    });
};
