// required packages
const config = require("../config")

//required services
const movieService = new (require("../services/movie.service"))()

module.exports = class MovieController {
    async home(req, res) {
        const movies = await movieService.getIndexPageMovies()
        res.render("user/index", { movies, title: "Home" });
    }

    async index(req, res) {
        // const page = req.query.page;
        // const { filter, templateFilter } = await MoviesFilter(req.query);
        // var paginator = await MoviesPaginator({ limit: 6, page, filter });
        // var genres = await Genre.findAll({ raw: true });

        // res.render("movies", {
        //     paginator,
        //     genres,
        //     templateFilter,
        //     title: "Browse Movies",
        // });
    }

    async show(req, res) {
        const id = req.params.id;

        const movie = await movieService.getMovieById(id)

        if (!movie) {
            return res.status(404).render("general/error", { status: 404, title: "Movie Not Found" });
        }

        return res.render("user/movie", {
            movie,
            title: movie.title,
            relates: [],
            screenshots: [],
            url: config.app.url,
        });
    }
}