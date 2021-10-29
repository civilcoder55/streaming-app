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
    async getMoviePaginator({ limit, page, filter }) {
        return await paginator({ model: Movie, limit, page, filter })
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
        if (genres) {
            if (!Array.isArray(genres)) {
                genres = [genres];
            }
            for (let i = 0; i < genres.length; i++) {
                const genre = await Genre.findOne({ where: { title: genres[i] } });
                await movie.addGenre(genre);
            }
        }


        movie.update({ poster: `/img/posters/${movie.id}.png`, cover: `/img/covers/${movie.id}.png` })

        return movie
    }

    async getMovieData(id) {
        const movie = await Movie.findOne({ where: { id } });
        if (!movie) {
            return { movie: null, movieGenres: null }
        }

        const movieGenres = await movie.getGenres({ raw: true });
        return { movie, movieGenres }
    }

    async updateMovie({ id, body, files }) {
        const { title, description, year, genres, country, duration, rate } = body;
        const movie = await Movie.findOne({ where: { id } });
        if (!movie) {
            throw new Error("Movie not found")
        }
        await movie.update({ title, description, year, country, duration, rate });

        const movieGenres = await movie.getGenres();
        await movie.removeGenres(movieGenres);


        if (genres) {
            if (!Array.isArray(genres)) {
                genres = [genres];
            }
            for (let i = 0; i < genres.length; i++) {
                const genre = await Genre.findOne({ where: { title: genres[i] } });
                await movie.addGenre(genre);
            }
        }

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