import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import createHttpError from 'http-errors';
import { INGREDIENT_UPLOAD_PATH, PIZZA_UPLOAD_PATH, PORT } from './constants';
import { httpErrorsMiddleware } from './middlewares/http-errors';
import { pizzaController } from './routes/pizza.controller';
import { ingredientController } from './routes/ingredient.controller';
import { filesController } from './routes/files.controller';

const app = express();

const main = async () => {
  // Init upload folders
  const folders = [PIZZA_UPLOAD_PATH, INGREDIENT_UPLOAD_PATH];
  folders.forEach(folder => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  });

  // Set cors
  app.use(cors());

  // Parse json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Load controllers
  pizzaController(app);
  ingredientController(app);
  filesController(app);

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
