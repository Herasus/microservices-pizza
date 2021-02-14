import { Express, Request, Response } from 'express';
import multer from 'multer';
import { INGREDIENT_UPLOAD_PATH } from '../constants';
import { SetIngredientDto } from '../dto/set-ingredient.dto';
import { ingredientService } from '../include';
import authMiddleware from '../middlewares/auth';
import { validateBody } from '../middlewares/validate-body';
import { getMulterStorage, imageFilter } from '../utilities/multer';

const upload = multer({ storage: getMulterStorage(INGREDIENT_UPLOAD_PATH), fileFilter: imageFilter });

export const ingredientController = (app: Express) => {
  app.get('/ingredients', async (req: Request, res: Response) => {
    const ingredients = await ingredientService.getIngredients();
    res.json(ingredients);
  });

  app.get('/ingredients/:ingredientId', async (req: Request, res: Response) => {
    const ingredients = await ingredientService.getIngredient(+req.params.ingredientId);
    res.json(ingredients);
  });

  app.post('/ingredients', authMiddleware(true), validateBody(SetIngredientDto), async (req: Request, res: Response) => {
    const ingredientId = await ingredientService.createIngredient(req.payload);
    res.status(201).json({ id: ingredientId });
  });

  app.put('/ingredients/:ingredientId', authMiddleware(true), validateBody(SetIngredientDto), async (req: Request, res: Response) => {
    await ingredientService.updateIngredient(+req.params.ingredientId, req.payload);
    res.status(204).end();
  });

  app.delete('/ingredients/:ingredientId', authMiddleware(true), async (req: Request, res: Response) => {
    await ingredientService.deleteIngredient(+req.params.ingredientId);
    res.status(204).end();
  });

  app.post('/ingredients/:ingredientId/image', authMiddleware(true), upload.single('image'), async (req: Request, res: Response) => {
    await ingredientService.setIngredientPath(+req.params.ingredientId, req.file.filename);

    res.status(201).end();
  });
};
