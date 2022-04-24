import jwt from 'jsonwebtoken';
import UserStore from '../store/UserStore';
import ErrorHandler from './ErrorHandlerService';
import config from '../config';

export default class AuthService {
  private UserStoreInstance: UserStore;
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    // Create instance of Data Access layer
    this.UserStoreInstance = new UserStore();
  }

  /**
   * @description Login user
   * @param loginData user login credentials
   * @returns Return token
   */
  async login(loginData: any): Promise<any> {
    try {
      const {email, password} = loginData;
      let user = await this.UserStoreInstance.getUserByEmail(email);

      if (!user) throw new ErrorHandler(401, 'User not found.');

      if (!user.validPassword(password)) throw new ErrorHandler(401, 'Invalid email or password!');

      let accessToken = jwt.sign({id: user.id, role: user.role}, config.salt, {
        expiresIn: 86400, // expires in 24 hours
      });

      return {token: accessToken};
    } catch (err) {
      throw err;
    }
  }
}
