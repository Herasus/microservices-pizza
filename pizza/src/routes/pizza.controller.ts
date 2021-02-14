import { Express, Request, Response } from 'express';
import multer from 'multer';
import { PIZZA_UPLOAD_PATH } from '../constants';
import { SetPizzaDto } from '../dto/set-pizza.dto';
import { pizzaService } from '../include';
import authMiddleware from '../middlewares/auth';
import { validateBody } from '../middlewares/validate-body';
import { getMulterStorage, imageFilter } from '../utilities/multer';

const upload = multer({ storage: getMulterStorage(PIZZA_UPLOAD_PATH), fileFilter: imageFilter });

export const pizzaController = (app: Express) => {
  app.get('/pizzas', async (req: Request, res: Response) => {
    const pizzas = await pizzaService.getPizzas();

    res.json(pizzas);
  });

  app.get('/pizzas/:pizzaId', async (req: Request, res: Response) => {
    const pizza = await pizzaService.getPizza(+req.params.pizzaId);

    res.json(pizza);
  });

  /** Create / update / delete operations are secured */

  app.delete('/pizzas/:pizzaId', authMiddleware(true), async (req: Request, res: Response) => {
    await pizzaService.deletePizza(+req.params.pizzaId);

    res.status(204).end();
  });

  app.post('/pizzas/:pizzaId/image', authMiddleware(true), upload.single('image'), async (req: Request, res: Response) => {
    await pizzaService.setPizzaPath(+req.params.pizzaId, req.file.filename);

    res.status(201).end();
  });

  app.post('/pizzas', authMiddleware(true), validateBody(SetPizzaDto), async (req: Request, res: Response) => {
    const payload = req.payload as SetPizzaDto;

    const pizzaId = await pizzaService.createPizza(payload);

    res.status(201).json({ id: pizzaId });
  });

  app.put('/pizzas/:pizzaId', authMiddleware(true), validateBody(SetPizzaDto), async (req: Request, res: Response) => {
    const payload = req.payload as SetPizzaDto;

    await pizzaService.updatePizza(+req.params.pizzaId, payload);

    res.status(201).end();
  });
};
