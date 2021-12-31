// required packages
const router = require('express').Router()

// required controllers
const movieController = new (require('../controllers/movie.controller'))()

// required middlewares

// required validation schema

const asyncHandler = function (fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res)).catch(next)
  }
}

router.get('/', movieController.home)
router.get('/movies', asyncHandler(movieController.index))
router.get('/movie/:id', movieController.show)

module.exports = router
