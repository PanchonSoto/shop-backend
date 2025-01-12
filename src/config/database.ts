// const config = {
//   "development": {
//     "username": "panshibe",
//     "password": "123456",
//     "database": "shopy_db",
//     "host": "localhost",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

import { Options } from "sequelize";
// import { envs } from "./envs";
const { envs } = require('./envs');

interface ConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

module.exports = {
  development: {
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    host: envs.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  test: {
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    host: envs.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  production: {
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    host: envs.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
