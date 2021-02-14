import { Express } from 'express';
import { SetVehicleDto } from '../dto/set-vehicle.dto';
import { vehicleService } from '../include';
import { validateBody } from '../middlewares/validate-body';

export const vehicleController = (app: Express) => {
  app.get('/vehicles', async (req, res) => {
    const data = await vehicleService.getVehicles();
    res.json(data);
  });

  app.get('/vehicles/:id', async (req, res) => {
    const data = await vehicleService.getVehicle(+req.params.id);
    res.json(data);
  });

  app.post('/vehicles', validateBody(SetVehicleDto), async (req, res) => {
    await vehicleService.createVehicle(req.payload);
    res.status(201).end();
  });

  app.put('/vehicles/:id', validateBody(SetVehicleDto), async (req, res) => {
    await vehicleService.updateVehicle(+req.params.id, req.payload);
    res.status(204).end();
  });

  app.delete('/vehicles/:id', async (req, res) => {
    await vehicleService.deleteVehicle(+req.params.id);
    res.status(204).end();
  });
};
