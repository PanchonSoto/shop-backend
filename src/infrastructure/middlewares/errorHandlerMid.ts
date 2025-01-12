import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../domain/errors/custom.error';


export function errorHandlerMid(err: Error | CustomError, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ success: false, message });
}
