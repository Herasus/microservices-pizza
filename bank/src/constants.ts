export const PORT = +(process.env.PORT ?? 80);

export const MYSQL_HOST = process.env.MYSQL_HOST ?? '';
export const MYSQL_USER = process.env.MYSQL_USER ?? '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? '';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'app';

export const AUTH_API_URL = process.env.AUTH_API_URL ?? '';
export const PIZZA_API_URL = process.env.PIZZA_API_URL ?? '';

export const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME ?? '';
export const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? '';
