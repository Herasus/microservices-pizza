import { Express } from 'express';
import { AssignOrderDto } from '../dto/assign-order.dto';
import { allocationService } from '../include';
import { validateBody } from '../middlewares/validate-body';
import { AppRequest } from '../services/express';

export const allocationController = (app: Express) => {
  app.post(
    '/orders/:orderId/assign',
    validateBody(AssignOrderDto),
    async (req: AppRequest<{ orderId: string }, AssignOrderDto>, res) => {
      await allocationService.assignOrder(
        +req.params.orderId,
        req.payload.deliveryManId,
        req.payload.vehicleId
      );

      res.status(201).end();
    }
  );

  app.post(
    '/orders/:orderId/delivered',
    async (req, res) => {
      await allocationService.endOrder(+req.params.orderId);

      res.status(201).end();
    }
  );
};
