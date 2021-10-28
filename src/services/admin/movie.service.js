// required packages
const Op = require("sequelize").Op;
const random = require("sequelize").random;
const config = require("../../config");
const paginator = require("../../utils/paginator.util")
// required models
const Movie = require("../../models/movie.model");
const Genre = require("../../models/genre.model");


module.exports = class AdminMovieService {
    async getMoviePaginator({ limit, page, filter }) {
        return await paginator({ model: Movie, limit, page, filter })
    }

    async getMovieById(id) {
        return await Movie.findOne({
            include: [{ model: Genre }],
            where: { id },
        });
    }




}