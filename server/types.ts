import * as express from 'express';

export type middlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;