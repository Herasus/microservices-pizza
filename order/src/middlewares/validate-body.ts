import { transformAndValidate } from 'class-transformer-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

interface AppValidationError {
  property: string;
  constraints?: { [type: string]: string };
  children?: AppValidationError[];
}

/**
 * Formats a `ValidationError` for JSON output
 * @param error The error returned by the class-validator `validate` method
 */
const formatValidationError = (error: ValidationError): AppValidationError => ({
  property: error.property,
  children: (error.children && error.children.length > 0) ? error.children.map(formatValidationError) : undefined,
  constraints: error.constraints,
});

/**
 * Validates a request body against a DTO class.
 *
 * If the request body is valid, the payload will be stored in `req.payload`.
 * Otherwise, an error will be thrown.
 *
 * @param classType The class to be checked. It should use `class-validator` decorators to validate the class.
 */
const createValidator = (from: string, to?: string) => (classType: ClassType<any>) => async (req: Request, res: Response, next: NextFunction) => {
  to = to || from;

  try {
    const obj = await transformAndValidate(classType, (req as any)[from], {
      validator: {
        whitelist: true,
      }
    });
    (req as any)[to] = obj;

    next();
  } catch (e) {
    let error = e;
    if (Array.isArray(e)) {
      error = { errors: e.map(formatValidationError) };
    }

    next(createError(
      400,
      `${to.charAt(0).toUpperCase() + to.slice(1)} validation failed`,
      error,
    ));
  }
};

/**
 * Validates a request query against a DTO class.
 *
 * If the request query is valid, the payload will be stored in `req.appQuery`.
 * Otherwise, an error will be thrown.
 *
 * @param classType The class to be checked. It should use `class-validator` decorators to validate the class.
 */
export const validateQuery = createValidator('query', 'appQuery');

/**
 * Validates a request body against a DTO class.
 *
 * If the request body is valid, the payload will be stored in `req.payload`.
 * Otherwise, an error will be thrown.
 *
 * @param classType The class to be checked. It should use `class-validator` decorators to validate the class.
 */
export const validateBody = createValidator('body', 'payload');

/**
 * Validates a request params against a DTO class.
 *
 * If the request params is valid, the payload will be stored in `req.appParams`.
 * Otherwise, an error will be thrown.
 *
 * @param classType The class to be checked. It should use `class-validator` decorators to validate the class.
 */
export const validateParams = createValidator('params', 'appParams');
