// required packages
const router = require("express").Router();
// const uploader = require("../utils/uploader");

// required controllers
const AdminMovieController = require("../controllers/admin/movie.controller");
const adminMovieController = new AdminMovieController()

// required middlewares
const requireAdmin = require("../middlewares/requireAdmin.middleware");
const validateBody = require("../middlewares/validateBody.middleware");

// required validation schema
const addMovieSchema = require("../schemas/addMovie.schema");




router.get("/movies", requireAdmin, adminMovieController.index);
// router.get("/movies/add", requireAdmin, adminMovieController.create);
// router.post("/movies/add", requireAdmin, uploader, validateBody(addMovieSchema), adminMovieController.store);
// router.get("/movies/edit/:id", requireAdmin, adminMovieController.edit);
// router.post("/movies/edit/:id", requireAdmin, uploader, validateBody(addMovieSchema), adminMovieController.update);
// router.post("/movies/delete/:id", requireAdmin, adminMovieController.delete);
// router.post("/movies/download/:id", requireAdmin, adminMovieController.downloadMovie);

// router.get("/genres", requireAdmin, adminController.listGenres);
// router.post("/genres/add", requireAdmin, adminController.storeGenre);
// router.post("/genres/edit/:id", requireAdmin, adminController.updateGenre);
// router.post("/genres/delete/:id", requireAdmin, adminController.deleteGenre);

module.exports = router;
