import {Express} from 'express';
import {createUser, getUserById, getUsers, deleteUser} from '../controllers/user.controller';
import {login} from '../controllers/auth.controller';
import {validate} from '../lib/validator';
import authorize, {roles} from '../lib/authorization';
import verifyToken from '../lib/verifyToken';

export default (server: Express) => {
  // Users Routes
  server.post(`/api/users`, [verifyToken, ...validate('createUser')], createUser);
  server.get(`/api/users`, [verifyToken], getUsers);
  server.get(`/api/users/:id`, [verifyToken, ...validate('userById')], getUserById);
  server.delete(`/api/users/:id`, [verifyToken, authorize([roles.Admin]), ...validate('userById')], deleteUser);

  // Auth Routes
  server.post(`/api/login`, validate('login'), login);
};
