// required packages
const router = require('express').Router()
const uploader = require('../utils/uploader.util')

// required controllers
const adminMovieController = new (require('../controllers/admin/movie.controller'))()
const adminGenreController = new (require('../controllers/admin/genre.controller'))()
const adminQueueController = new (require('../controllers/admin/queue.controller'))()
// required middlewares
const requireAdmin = require('../middlewares/requireAdmin.middleware')
const validateBody = require('../middlewares/validateBody.middleware')

// required validation schema
const movieSchema = require('../schemas/movie.schema')

router.get('/movies', requireAdmin, adminMovieController.index)
router.get('/movies/add', requireAdmin, adminMovieController.create)
router.post('/movies/add', requireAdmin, uploader.imageUploader, validateBody(movieSchema.store), adminMovieController.store)
router.get('/movies/edit/:id', requireAdmin, adminMovieController.edit)
router.post('/movies/edit/:id', requireAdmin, uploader.imageUploader, validateBody(movieSchema.update), adminMovieController.update)
router.post('/movies/delete/:id', requireAdmin, adminMovieController.delete)
router.post('/movies/upload/:id', requireAdmin, uploader.movieUploader, adminMovieController.upload)
router.post('/movies/transcode/:id', requireAdmin, adminMovieController.transcode)
router.post('/movies/parse', requireAdmin, adminMovieController.parse)

router.get('/genres', requireAdmin, adminGenreController.index)
router.post('/genres/add', requireAdmin, adminGenreController.store)
router.post('/genres/edit/:id', requireAdmin, adminGenreController.update)
router.post('/genres/delete/:id', requireAdmin, adminGenreController.delete)

router.get('/queue', requireAdmin, adminQueueController.index)
router.post('/queue/job/delete/:id', requireAdmin, adminQueueController.delete)
module.exports = router
