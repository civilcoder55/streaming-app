// required packages
const router = require("express").Router();
const uploader = require("../utils/uploader.util");

// required controllers
const AdminMovieController = require("../controllers/admin/movie.controller");
const AdminGenreController = require("../controllers/admin/genre.controller");
const adminMovieController = new AdminMovieController()
const adminGenreController = new AdminGenreController()


// required middlewares
const requireAdmin = require("../middlewares/requireAdmin.middleware");
const validateBody = require("../middlewares/validateBody.middleware");

// required validation schema
const movieSchema = require("../schemas/movie.schema");




router.get("/movies", requireAdmin, adminMovieController.index);
router.get("/movies/add", requireAdmin, adminMovieController.create);
router.post("/movies/add", requireAdmin, uploader, validateBody(movieSchema.store), adminMovieController.store);
router.get("/movies/edit/:id", requireAdmin, adminMovieController.edit);
router.post("/movies/edit/:id", requireAdmin, uploader, validateBody(movieSchema.update), adminMovieController.update);
router.post("/movies/delete/:id", requireAdmin, adminMovieController.delete);
// router.post("/movies/download/:id", requireAdmin, adminMovieController.downloadMovie);

router.get("/genres", requireAdmin, adminGenreController.index);
router.post("/genres/add", requireAdmin, adminGenreController.store);
router.post("/genres/edit/:id", requireAdmin, adminGenreController.update);
router.post("/genres/delete/:id", requireAdmin, adminGenreController.delete);

module.exports = router;
