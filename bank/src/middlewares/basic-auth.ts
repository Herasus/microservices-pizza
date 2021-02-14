import basicAuth from 'express-basic-auth';
import { BASIC_AUTH_PASSWORD, BASIC_AUTH_USERNAME } from '../constants';

/**
 * Basic Auth is used for communication between services
 * @param req
 * @param res
 * @param next
 */
const basicAuthMiddleware = basicAuth({
  users: { [BASIC_AUTH_USERNAME]: BASIC_AUTH_PASSWORD }
});

export default basicAuthMiddleware;
