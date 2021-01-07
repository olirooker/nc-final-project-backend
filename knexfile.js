// const ENV = process.env.NODE_ENV || "development";

// const development = {
//   client: "pg",
//   connection: {
//     database: "nc_final_project",
//   },
//   seeds: { directory: "./db/seeds/" },
// };
// const test = {
//   client: "pg",
//   connection: {
//     database: "nc_final_project_test",
//   },
//   seeds: { directory: "./db/seeds" },
// };

// const dbConfig = {
//   development,
//   test,
// };

// module.exports = dbConfig[ENV];

const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';
const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
const customConfig = {
  development: {
    connection: {
      database: 'nc_final_project',
    },
  },
  test: {
    connection: {
      database: 'nc_final_project_test',
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: false,
      //  {
      //   rejectUnauthorized: false,
      // },
    },
  },
};
module.exports = { ...customConfig[ENV], ...baseConfig };
