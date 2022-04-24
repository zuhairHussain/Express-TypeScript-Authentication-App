import User, {UserInterface} from '../models/user.model';

export default class UserStore {
  /**
   * @description Create new user in DB
   * @returns Returns the information of newly created user
   */
  async createUser(user: UserInterface) {
    return await User.create(user);
  }

  /**
   * @description Fetch all users from DB
   * @returns Returns array of users
   */
  async getAllUsers() {
    return await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
  }

  /**
   * @description Fetch users by ID from DB
   * @returns Returns user matched by id
   */
  async getUserById(id: number) {
    return await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
  }

  /**
   * @description Fetch users by email from DB
   * @returns Returns user matched by email
   */
  async getUserByEmail(email: string) {
    return await User.findOne({where: {email: email}});
  }

  /**
   * @description Delete users by ID from DB
   * @returns Delete user matched by id
   */
  async deleteUserById(id: number) {
    return await User.destroy({where: {id: id}});
  }
}
