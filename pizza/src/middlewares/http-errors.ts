import { NextFunction, Request, Response } from 'express';

export interface HttpErrorsMiddlewareOptions {
  before: (err: any, req: Request, isExposed: boolean, cb: (beforeErr?: boolean) => void) => any;
  formatError: (err: any, req: Request, isExposed: boolean) => any;
}

export const defaults: HttpErrorsMiddlewareOptions = {
  before: (err, req, isExposed, cb) => {
    if (isExposed) return cb();
    cb();
  },
  formatError: (err, req, isExposed) => {
    if (err.statusCode >= 500) console.log(err);
    if (isExposed) {
      return {
        error: {
          code: err.statusCode,
          name: err.name,
          message: err.message,
          detail: err.detail,
          errors: err.errors,
        },
      };
    }
    return {
      error: {
        name: err.name,
        message: err.message,
      },
    };
  },
};

function isPromise(v: any): v is Promise<any> {
  return !!(v && typeof v.then === 'function');
}

export const httpErrorsMiddleware = (opts: Partial<HttpErrorsMiddlewareOptions> = {}) => {
  const {
    before = defaults.before,
    formatError = defaults.formatError,
  } = opts;

  /* eslint-disable no-unused-vars */
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    const maybeJson = res.headersSent
      // eslint-disable-next-line no-empty-function
      ? () => {}
      : (json: any) => res.json(json);

    if (!res.headersSent) {
      if (err.status) {
        res.status(err.status);
      } else {
        res.status(500);
      }

      res.set('Cache-Control', undefined);
    }

    const isExposed = err.expose;

    let cbWasCalled = false;
    const cb = (beforeErr = false) => {
      if (beforeErr) {
        console.warn('http-errors-express: error in before() function: ');
        console.warn(err);
      }
      if (cbWasCalled) return;
      cbWasCalled = true;
      maybeJson(formatError(err, req, isExposed));
    };

    const maybePromise = before(err, req, isExposed, cb);
    if (isPromise(maybePromise)) {
      maybePromise.then(() => { cb(); }, cb);
    }
  };
};
