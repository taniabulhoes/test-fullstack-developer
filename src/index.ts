import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { AppDataSource } from './database/data-source';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

AppDataSource.initialize();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
