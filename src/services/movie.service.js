// required packages
const Op = require("sequelize").Op;
const random = require("sequelize").random;
const config = require("../config");

// required models
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");


module.exports = class MovieService {
    async getIndexPageMovies() {
        return await Movie.findAll({
            subQuery: false,
            include: [
                {
                    model: Genre,
                },
            ],
            limit: 6,
            order: [["id", "DESC"]],
        });
    }

    async getMovieById(id) {
        return await Movie.findOne({
            include: [{ model: Genre }],
            where: { id },
        });
    }




}