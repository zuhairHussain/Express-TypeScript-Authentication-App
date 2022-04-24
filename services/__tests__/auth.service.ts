import faker from '@faker-js/faker';
import sequelize from '../../config/db';
import {UserInterface} from '../../models/user.model';
import UserService from '../user.service';
import AuthService from '../auth.service';
import supertest from 'supertest';
import server from '../../config/server';

const UserServiceInstance = new UserService();
const AuthServiceInstance = new AuthService();

describe('UserService', () => {
  beforeAll(async () => {
    await sequelize.sync({force: true});
  });

  it('should return token', async () => {
    const randomString = faker.random.alphaNumeric(10);

    const payload: UserInterface = {
      name: randomString,
      email: `user-${randomString}@email.com`,
      password: `Abc1234$`,
    };

    await UserServiceInstance.createUser(payload);
    let loginRes = await AuthServiceInstance.login(payload);

    expect(loginRes).toMatchObject({token: expect.anything()});
  });

  it('should not return token', async () => {
    const randomString = faker.random.alphaNumeric(10);

    const payload = {
      email: `user-${randomString}@email.com`,
      password: `Abc1234$`,
    };

    await supertest(server).get('/api/users').send(payload).expect(401);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
