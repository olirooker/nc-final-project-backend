const ENV = process.env.NODE_ENV || 'development';

const development = {
  client: 'pg',
  connection: {
    database: 'nc_final_project'
  },
  seeds: { directory: './db/seeds/' }
};
const test = {
  client: 'pg',
  connection: {
    database: 'nc_final_project_test'
  },
  seeds: { directory: './db/seeds' }
};

const dbConfig = {
  development,
  test
};

module.exports = dbConfig[ENV];
