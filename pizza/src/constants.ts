export const PORT = +(process.env.PORT ?? 80);

export const MYSQL_HOST = process.env.MYSQL_HOST ?? '';
export const MYSQL_USER = process.env.MYSQL_USER ?? '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? '';

export const JWT_EXPIRATION = +(process.env.JWT_EXPIRATION ?? (30 * 24 * 60 * 60));
export const JWT_SECRET = process.env.JWT_SECRET ?? 'app';

export const PIZZA_UPLOAD_PATH = 'uploads/pizzas/';
export const INGREDIENT_UPLOAD_PATH = 'uploads/ingredients/';

export const AUTH_API_URL = process.env.AUTH_API_URL ?? '';
