// required packages
const paginator = require("../database/elasticsearch");

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

    async getMoviePaginator({ size, page, filter, sort }) {
        return await paginator({ size, page, filter, sort })
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