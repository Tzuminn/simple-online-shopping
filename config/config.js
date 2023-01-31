require('dotenv').config()

module.exports =
{
  development: {
    username: 'root',
    password: 'password',
    database: 'eshopping',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql'
  }
}
