import faker from '@faker-js/faker';
import supertest from 'supertest';
import sequelize from '../../config/db';
import server from '../../config/server';
import {UserInterface} from '../../models/user.model';
import UserService from '../user.service';
import AuthService from '../auth.service';

const UserServiceInstance = new UserService();
const AuthServiceInstance = new AuthService();

describe('UserService', () => {
  beforeAll(async () => {
    await sequelize.sync({force: true});
  });

  it('should create user account', async () => {
    const randomString = faker.random.alphaNumeric(10);

    const payload: UserInterface = {
      name: randomString,
      email: `user-${randomString}@email.com`,
      password: `Abc1234$`,
    };

    let response = await UserServiceInstance.createUser(payload);
    const {name, email} = response;

    expect(name).toEqual(randomString);
    expect(email).toEqual(`user-${randomString}@email.com`);
  });

  it('should return all users because valid access token provided.', async () => {
    const randomString = faker.random.alphaNumeric(10);

    const payload: UserInterface = {
      name: randomString,
      email: `user-${randomString}@email.com`,
      password: `Abc1234$`,
    };

    await UserServiceInstance.createUser(payload);
    let loginRes = await AuthServiceInstance.login(payload);

    const response = await supertest(server).get('/api/users').set('x-access-token', loginRes.token).expect(200);
  });

  it('should not return all users because valid access token not provided.', async () => {
    const invalidJwt = faker.random.alphaNumeric(10);

    const response = await supertest(server).get('/api/users').expect(401).set('x-access-token', `${invalidJwt}`);
  });

  it('should not allow user to delete any user with the role user.', async () => {
    const randomString = faker.random.alphaNumeric(10);

    const payload: UserInterface = {
      name: randomString,
      email: `user-${randomString}@email.com`,
      password: `Abc1234$`,
    };

    await UserServiceInstance.createUser(payload);
    let loginRes = await AuthServiceInstance.login(payload);

    await supertest(server).delete('/api/users/1').expect(401).set('x-access-token', `${loginRes.token}`);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
