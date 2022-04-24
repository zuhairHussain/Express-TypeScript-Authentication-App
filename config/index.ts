const dbCredentials = require('./config');

let env: any = process.env.NODE_ENV || 'development';
let {username, password, database, host, port} = dbCredentials[env];

const config: any = {
  dbHost: host,
  dbName: database,
  dbUser: username,
  dbPass: password,
  dbPort: port,
  env: process.env.NODE_ENV,
  salt: process.env.SALT,
};

export default config;
