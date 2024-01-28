const pgp = require('pg-promise')();

const cn = {
  host: 'test-fullstack-developer-server.onrender.com',
  port: 5433,
  database: 'ToDoDB',
  user: 'postgres',
  password: '1234'
};

const db = pgp(cn);

module.exports = db;
