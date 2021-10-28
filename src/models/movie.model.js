// required packages 
const Sequelize = require("sequelize");
const sequelizeClient = require("../database/sequelize");


const Movie = sequelizeClient.define("movies", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: { type: Sequelize.STRING, allowNull: false, unique: true },
    rate: { type: Sequelize.DECIMAL(10, 1) },
    year: { type: Sequelize.INTEGER },
    duration: { type: Sequelize.INTEGER },
    country: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
    queued: { type: Sequelize.BOOLEAN, defaultValue: false },
    downloaded: { type: Sequelize.BOOLEAN, defaultValue: false },
    transcoded: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = Movie;