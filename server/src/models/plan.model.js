// required packages 
const Sequelize = require("sequelize");
const sequelizeClient = require("../database/sequelize");


const Plan = sequelizeClient.define("plans", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: { type: Sequelize.STRING },
    price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    rank: { type: Sequelize.INTEGER, unique: true },  // to manage can user upgrade ot not 
    description: { type: Sequelize.TEXT },
});

module.exports = Plan;
