import { Express } from 'express';
import { SetDeliveryManDto } from '../dto/set-delivery-man.dto';
import { deliveryManService } from '../include';
import { validateBody } from '../middlewares/validate-body';

export const deliveryManController = (app: Express) => {
  app.get('/delivers', async (req, res) => {
    const data = await deliveryManService.getDeliveryMen();
    res.json(data);
  });

  app.get('/delivers/:id', async (req, res) => {
    const data = await deliveryManService.getOneDeliveryMan(+req.params.id);
    res.json(data);
  });

  app.post('/delivers', validateBody(SetDeliveryManDto), async (req, res) => {
    await deliveryManService.createDeliveryMan(req.payload);
    res.status(201).end();
  });

  app.put('/delivers/:id', validateBody(SetDeliveryManDto), async (req, res) => {
    await deliveryManService.updateDeliveryMan(+req.params.id, req.payload);
    res.status(204).end();
  });

  app.delete('/delivers/:id', async (req, res) => {
    await deliveryManService.deleteDeliveryMan(+req.params.id);
    res.status(204).end();
  });
};
