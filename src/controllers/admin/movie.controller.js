//required services
const AdminMovieService = require("../../services/admin/movie.service")
const adminMovieService = new AdminMovieService()

module.exports = class AdminMovieController {

    async index(req, res) {
        const page = req.query.page;
        const paginator = await adminMovieService.getMoviePaginator({ limit: 6, page, filter: {} });
        return res.render("admin/movies", { paginator });
    }

    async show(req, res) {
        const id = req.params.id;

    }
}