const pgp = require('pg-promise')();

const cn = {
  host: 'https://test-fullstack-developer-server.onrender.com', // server name or IP address;
  port: 5433,
  database: 'ToDoDB',
  user: 'postgres',
  password: '1234'
};

const db = pgp(cn);

module.exports = db;
