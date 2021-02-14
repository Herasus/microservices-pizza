import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import createHttpError from 'http-errors';
import { PORT } from './constants';
import authMiddleware from './middlewares/auth';
import { httpErrorsMiddleware } from './middlewares/http-errors';
import { allocationController } from './routes/allocation.controller';
import { deliveryManController } from './routes/deliveryman.controller';
import { vehicleController } from './routes/vehicle.controller';

const app = express();

const main = async () => {
  app.use(cors());

  // Parse json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Main middleware - check admin
  app.use(authMiddleware);

  // Load controllers
  deliveryManController(app);
  vehicleController(app);
  allocationController(app);

  // Catch all routes
  app.use(() => {
    throw new createHttpError.NotFound();
  });

  // JSON errors
  app.use(httpErrorsMiddleware());

  app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });
};

main();
