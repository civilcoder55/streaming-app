// reqired packages
const config = require("../config");
const Sequelize = require("sequelize");


// init sequelize database connection instance
const sequelizeClient = new Sequelize(config.db.name, config.db.username, config.db.password, {
  dialect: "mysql",
  host: config.db.host,
  logging: false,
});

module.exports = sequelizeClient;
