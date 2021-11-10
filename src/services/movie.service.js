// required packages
const Op = require("sequelize").Op;
const random = require("sequelize").random;
const config = require("../config");
const elaClient = require("../database/elasticsearch")
const paginator = require("../utils/paginator.util")

// required models
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");


module.exports = class MovieService {
    async getIndexPageMovies() {
        return await Movie.findAll({
            limit: 6,
            order: [["id", "DESC"]],
        });
    }

    async getMovieById(id) {
        return await Movie.findOne({
            where: { id },
        });
    }

    async getAllGenres() {
        return await Genre.findAll({ raw: true });
    }

    async getMoviePaginator({ limit, page }) {
        return await paginator({ model: Movie, limit, page, orderBy: [["id", "asc"]] })
    }

    async queryMovies(page) {
        return await elaClient.search({
            index: 'movies',
            body: {
                size: 20,
                from: (page - 1) * 20,
                query: {
                    match_all: {}
                },
                sort: [
                    { rate: { order: "desc" } }
                ]
            }
        })
    }


}