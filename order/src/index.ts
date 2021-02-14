import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import createHttpError from 'http-errors';
import { PORT } from './constants';
import { httpErrorsMiddleware } from './middlewares/http-errors';
import { orderController } from './routes/order.controller';

const app = express();

const main = async () => {
  app.use(cors());

  // Parse json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Load controllers
  orderController(app);

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
