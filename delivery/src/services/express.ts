export interface PayloadRequest<Payload> extends Express.Request {
  payload: Payload;
}

export interface AppRequest<Params, Payload> extends Express.Request {
  payload: Payload;
  params: Params;
}
