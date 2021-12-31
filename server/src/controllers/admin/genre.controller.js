//required services
const adminGenreService = new (require("../../services/admin/genre.service"))()

module.exports = class AdminGenreController {

    async index(req, res) {
        const genres = await adminGenreService.getAllGenres()
        return res.render("admin/genres", { genres });
    }

    async store(req, res) {
        try {
            await adminGenreService.createGenre(req.body.title)
        } catch (error) {
            console.log(error)
            req.flash("error", error.message)
        } finally {
            return res.redirect("/admin/genres");
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id
            await adminGenreService.updateGenre({ id, title });
        } catch (error) {
            req.flash("error", "title already exist");
        } finally {
            return res.redirect("/admin/genres");
        }
    }

    async delete(req, res) {
        const id = req.params.id
        await adminGenreService.deleteGenre(id);
        return res.redirect("/admin/genres");
    }
}