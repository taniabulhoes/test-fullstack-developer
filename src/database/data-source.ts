import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Task } from '../entities/Task';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Task, User],
  migrations: [`${__dirname}/migration/*.ts`],
  subscribers: [],
});
