"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var _Task = require("../entities/Task");
var _User = require("../entities/User");
const AppDataSource = new _typeorm.DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [_Task.Task, _User.User],
  migrations: [`${__dirname}/migration/*.ts`],
  subscribers: []
});
exports.AppDataSource = AppDataSource;