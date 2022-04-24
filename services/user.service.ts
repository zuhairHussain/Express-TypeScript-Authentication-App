import {UserInterface} from '../models/user.model';
import UserStore from '../store/UserStore';
import ErrorHandler from './ErrorHandlerService';

export default class UserService {
  private UserStoreInstance: UserStore;
  /**
   * @description Create an instance of UserService
   */
  constructor() {
    // Create instance of Data Access layer
    this.UserStoreInstance = new UserStore();
  }

  /**
   * @description Create new user
   * @param {UserInterface} user user information
   * @returns Create new user
   */
  async createUser(user: UserInterface): Promise<any> {
    try {
      let userRes = await this.UserStoreInstance.getUserByEmail(user.email);

      if (userRes) throw new ErrorHandler(401, 'User already exist.');

      return await this.UserStoreInstance.createUser(user);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description Get all users
   * @returns {Promise}
   */
  async getAllUsers(): Promise<any> {
    try {
      return await this.UserStoreInstance.getAllUsers();
    } catch (err) {
      throw new ErrorHandler(500, 'Error occured while fetching user accounts.', err);
    }
  }

  /**
   * @description Get all users
   * @returns {Promise}
   */
  async getUserById(id: number): Promise<any> {
    try {
      let getUserByIdRes = await this.UserStoreInstance.getUserById(id);
      if (!getUserByIdRes) throw new ErrorHandler(404, `No user found by id: ${id}`);

      return getUserByIdRes;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description Delete user by id
   * @returns {Promise}
   */
  async deleteUserById(id: number): Promise<any> {
    try {
      let deleteUserByIdRes = await this.UserStoreInstance.deleteUserById(id);

      if (!deleteUserByIdRes) throw new ErrorHandler(404, `No user found by id: ${id}`);

      return deleteUserByIdRes;
    } catch (err) {
      throw err;
    }
  }
}
