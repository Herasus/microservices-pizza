import {
  MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER
} from '../constants';
import MySQLHandler from './mysql-handler';

export const mysql = new MySQLHandler({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  charset: 'utf8mb4',
  multipleStatements: true
});
