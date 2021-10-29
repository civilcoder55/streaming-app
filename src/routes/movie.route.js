// required packages
const router = require("express").Router();

// required controllers
const movieController = new (require("../controllers/movie.controller"))()

// required middlewares


// required validation schema



router.get("/", movieController.home);
router.get("/movies", movieController.index);
router.get("/movie/:id", movieController.show);

module.exports = router;
