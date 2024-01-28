const pgp = require('pg-promise')();
require('dotenv').config();

const cn = {
  host: process.env.DATABASE_URL,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

const db = pgp(cn);

module.exports = db;
