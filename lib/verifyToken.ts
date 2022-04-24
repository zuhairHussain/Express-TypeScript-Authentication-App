import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import ErrorHandler from '../services/ErrorHandlerService';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    let token: string = String(req.headers['x-access-token']);

    if (!token) throw new ErrorHandler(401, 'No token provided.');

    jwt.verify(token, config.salt, function (err: any, decoded: any) {
      if (err) throw new ErrorHandler(401, 'Failed to authenticate token.');

      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    next(error);
  }
}
