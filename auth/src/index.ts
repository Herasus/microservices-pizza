import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import createHttpError from 'http-errors';
import { PORT } from './constants';
import { httpErrorsMiddleware } from './middlewares/http-errors';
import { mainController } from './routes/main';
import { authService } from './include';

const app = express();

const main = async () => {
  // Init the main user
  authService.initAdminUser();

  app.use(cors());

  // Parse json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Load controller
  mainController(app);

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
