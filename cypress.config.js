require('dotenv').config()
const { defineConfig } = require("cypress");
const mysql = require('cypress-mysql');

module.exports = defineConfig({
  e2e: {
      env: {
          db: {
              host: 'localhost',
              user: 'sdougans',
              password: process.env.mySqlPassword,
              database: 'testdb'
          },
      },
      async setupNodeEvents(on, config) {
          mysql.configurePlugin(on);
      },
  },
});
