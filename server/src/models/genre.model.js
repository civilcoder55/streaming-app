// required packages
const Sequelize = require('sequelize')
const sequelizeClient = require('../database/sequelize')

const Genre = sequelizeClient.define('genres', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: { type: Sequelize.STRING, allowNull: false, unique: true }
})

module.exports = Genre
