export const PORT = +(process.env.PORT ?? 80);

export const MYSQL_HOST = process.env.MYSQL_HOST ?? '';
export const MYSQL_USER = process.env.MYSQL_USER ?? '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? '';

export const JWT_EXPIRATION = +(process.env.JWT_EXPIRATION ?? (30 * 24 * 60 * 60));
export const JWT_SECRET = process.env.JWT_SECRET ?? 'app';

export const ADMIN_USER_EMAIL = process.env.ADMIN_USER_EMAIL ?? '';
export const ADMIN_USER_PASSWORD = process.env.ADMIN_USER_PASSWORD ?? '';
