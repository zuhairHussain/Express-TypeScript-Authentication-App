import {Request} from 'express';
import {body, param} from 'express-validator';
import {validationResult} from 'express-validator';
import ErrorHandler from '../services/ErrorHandlerService';

export function validate(method: string) {
  switch (method) {
    case 'createUser': {
      return [
        body('name', 'Name is required').exists(),
        body('email', 'Valid email is required').exists().normalizeEmail().isEmail(),
        body('password', 'Valid password is required. Password must have min 8 chars, contains uppercase , lowercase, number, and symbol')
          .exists()
          .isLength({min: 8})
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ];
    }
    case 'userById':
      return [param('id', 'Valid ID is required').exists().isNumeric()];
    case 'login':
      return [body('email', 'Valid email is required.').exists().isEmail(), body('password', 'Password is required.').exists()];
    default:
      return [];
  }
}

export function validateResponse(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorList = errors.array();
    throw new ErrorHandler(400, errorList[0].msg, errors.array());
  }
}
