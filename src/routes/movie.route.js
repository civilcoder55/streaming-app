// required packages
const router = require("express").Router();

// required controllers
const MovieController = require("../controllers/movie.controller");
const movieController = new MovieController()

// required middlewares


// required validation schema



router.get("/", movieController.home);
router.get("/movies", movieController.index);
router.get("/movie/:id", movieController.show);

module.exports = router;
