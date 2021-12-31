// required packages
const Sequelize = require('sequelize')
const sequelizeClient = require('../database/sequelize')

const Subscription = sequelizeClient.define('subscriptions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  paid: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  start: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  end: { type: Sequelize.DATE, allowNull: true }
})

module.exports = Subscription
