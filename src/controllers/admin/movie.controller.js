//required services
const AdminMovieService = require("../../services/admin/movie.service")
const adminMovieService = new AdminMovieService()

module.exports = class AdminMovieController {

    async index(req, res) {
        const page = req.query.page;
        const paginator = await adminMovieService.getMoviePaginator({ limit: 6, page, filter: {} });
        return res.render("admin/movies/index", { paginator });
    }

    async create(req, res) {
        const genres = await adminMovieService.getAllGenres()
        return res.render("admin/movies/create", { genres, messages: req.flash() });
    }

    async store(req, res) {
        try {
            await adminMovieService.createMovie({ body: req.body, files: req.files })
            return res.redirect("/admin/movies");
        } catch (error) {
            console.log(error)
            req.flash("error", error.message)
            return res.redirect('/admin/movies/add');
        }
    }

    async edit(req, res) {
        const id = req.params.id
        const { movie, movieGenres } = await adminMovieService.getMovieData(id)
        if (!movie) {
            return res.render("general/error", { status: 404, title: "Movie Not Found" });
        }
        const genres = await adminMovieService.getAllGenres()
        return res.render("admin/movies/edit", { movie, genres, movieGenres, messages: req.flash() });
    }

    async update(req, res) {
        const id = req.params.id
        await adminMovieService.updateMovie({ id, body: req.body, files: req.files })
        return res.redirect("/admin/movies");
    }

    async delete(req, res) {
        const id = req.params.id
        await adminMovieService.deleteMovie(id)
        return res.redirect("/admin/movies");
    }
}