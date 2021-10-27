const config = require("../config");
const Sequelize = require("sequelize");

const sequelizeClient = new Sequelize(config.db.name, config.db.username, config.db.password, {
  dialect: "mysql",
  host: config.db.host,
  logging: false,
});

module.exports = sequelizeClient;
