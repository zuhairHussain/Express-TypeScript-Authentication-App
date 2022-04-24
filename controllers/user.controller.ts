import {Request, Response, NextFunction} from 'express';
import {validateResponse} from '../lib/validator';
import UserService from '../services/user.service';
const UserServiceInstance = new UserService();

/**
 * @description Create new user
 * @param {Request} req Express req object
 * @param {Response} res Express res object
 * @returns newly created user info
 */
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    /* Validating request body */
    validateResponse(req);

    const createUserRes = await UserServiceInstance.createUser(req.body);
    return res.send(createUserRes);
  } catch (err) {
    return next(err);
  }
}

/**
 * @description Get all users
 * @param {Request} req Express req object
 * @param {Response} res Express res object
 * @returns Returns users array
 */
export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const getAllUsersRes = await UserServiceInstance.getAllUsers();
    return res.send(getAllUsersRes);
  } catch (err) {
    return next(err);
  }
}

/**
 * @description Get user by id
 * @param {Request} req Express req object
 * @param {Response} res Express res object
 * @returns Returns user match by id
 */
export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    /* Validating request body */
    validateResponse(req);

    const id: number = Number(req.params?.id);
    const createUserRes = await UserServiceInstance.getUserById(id);
    return res.send(createUserRes);
  } catch (err) {
    return next(err);
  }
}

/**
 * @description Delete user by id
 * @param {Request} req Express req object
 * @param {Response} res Express res object
 * @returns Delete user match by id
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    /* Validating request body */
    validateResponse(req);

    const id: number = Number(req.params?.id);
    await UserServiceInstance.deleteUserById(id);
    return res.send({message: `User having ID: ${id} is deleted successfully.`});
  } catch (err) {
    return next(err);
  }
}
