export interface PayloadRequest<Payload> extends Express.Request {
  payload: Payload;
}
