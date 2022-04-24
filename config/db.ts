import {Sequelize} from 'sequelize';
import config from './index';

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  dialect: 'mysql',
  port: config.dbPort,
});

export default sequelize;
