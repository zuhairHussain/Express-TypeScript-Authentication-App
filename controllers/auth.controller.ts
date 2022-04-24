import {Request, Response, NextFunction} from 'express';
import {validateResponse} from '../lib/validator';
import AuthService from '../services/auth.service';
const AuthServiceInstance = new AuthService();

/**
 * @description Login user
 * @param {Request} req Express req object
 * @param {Response} res Express res object
 * @returns return token for user login
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    /* Validating request body */
    validateResponse(req);

    const loginRes = await AuthServiceInstance.login(req.body);
    return res.send(loginRes);
  } catch (err) {
    return next(err);
  }
}
