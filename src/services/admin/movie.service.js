// required packages
const Op = require("sequelize").Op;
const random = require("sequelize").random;
const config = require("../../config");
const paginator = require("../../utils/paginator.util")
const imageResizer = require("../../utils/resizer.util")
const path = require("path")
// required models
const Movie = require("../../models/movie.model");
const Genre = require("../../models/genre.model");


module.exports = class AdminMovieService {
    async getMoviePaginator({ limit, page }) {
        return await paginator({ model: Movie, limit, page, orderBy: [["id", "DESC"]] })
    }

    async getAllGenres() {
        return await Genre.findAll({ raw: true });
    }

    async createMovie({ body, files }) {
        const { title, description, year, genres, country, duration, rate } = body;
        const movie = await Movie.create({ title, description, year, country, duration, rate });
        imageResizer({ buffer: files.cover[0].buffer, x: 270, y: 400, path: path.join(__dirname, `../../public/img/covers/${movie.id}.png`) });
        imageResizer({ buffer: files.poster[0].buffer, x: 540, y: 308, path: path.join(__dirname, `../../public/img/posters/${movie.id}.png`) });

        // if (files.sub) {
        //   SubtitleHandler({ buffer: req.files.sub[0].buffer, path: `./data/${movie.id}/${movie.id}.vtt` });
        // }

        // add genres to the movie
        let _genres;
        if (genres) {
            _genres = Array.isArray(genres) ? genres.join(',') : genres
        }


        movie.update({ poster: `/img/posters/${movie.id}.png`, cover: `/img/covers/${movie.id}.png`, genres: _genres })

        return movie
    }

    async getMovieData(id) {
        return await Movie.findOne({ where: { id } });
    }

    async updateMovie({ id, body, files }) {
        const { title, description, year, genres, country, duration, rate } = body;
        const movie = await Movie.findOne({ where: { id } });
        if (!movie) {
            throw new Error("Movie not found")
        }

        let _genres;
        if (genres) {
            _genres = Array.isArray(genres) ? genres.join(',') : genres
        }
        
        await movie.update({ title, description, year, country, duration, rate, genres: _genres });





        if (files.cover) {
            imageResizer({ buffer: files.cover[0].buffer, x: 270, y: 400, path: path.join(__dirname, `../../public/img/covers/${movie.id}.png`) });
        } else if (files.poster) {
            imageResizer({ buffer: files.poster[0].buffer, x: 540, y: 308, path: path.join(__dirname, `../../public/img/posters/${movie.id}.png`) });
        } else if (files.sub) {
            // SubtitleHandler({ buffer: req.files.sub[0].buffer, path: `./data/${movie.id}/${movie.id}.vtt` });
        }

        return movie
    }

    async deleteMovie(id) {
        return await Movie.destroy({ where: { id } });
    }
}