import { Express, Request, Response } from 'express';
import path from 'path';
import { INGREDIENT_UPLOAD_PATH, PIZZA_UPLOAD_PATH } from '../constants';

export const filesController = (app: Express) => {
  app.use('/files/pizzas/:filename', async (req: Request, res: Response) => {
    res.sendFile(
      path.join(PIZZA_UPLOAD_PATH, req.params.filename),
      { root: path.join(__dirname, '../../') }
    );
  });

  app.use('/files/ingredients/:filename', async (req: Request, res: Response) => {
    res.sendFile(
      path.join(INGREDIENT_UPLOAD_PATH, req.params.filename),
      { root: path.join(__dirname, '../../') }
    );
  });
};
