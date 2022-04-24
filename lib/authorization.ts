import {Request, Response, NextFunction} from 'express';
import ErrorHandler from '../services/ErrorHandlerService';

export const roles = {
  User: 'user',
  Admin: 'admin',
};

export default function authorize(roles: string[]): any {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (roles.length && !roles.includes(req.role)) {
          // user's role is not authorized
          throw new ErrorHandler(401, 'Unauthorized');
        }
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
}
