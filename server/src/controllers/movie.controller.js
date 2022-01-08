// required packages
const config = require('../config')

// required services
const movieService = new (require('../services/movie.service'))()

module.exports = class MovieController {
  async home (req, res) {
    const movies = await movieService.getIndexPageMovies()
    res.render('user/index', { movies, title: 'Home' })
  }

  async index (req, res, next) {
    const page = req.query.page
    const filter = {
      genre: req.query.genre?.trim(),
      rate: req.query.rate?.trim().replace('+', ''),
      year: req.query.year?.trim(),
      q: req.query.q
    }

    const sort = req.query.sort?.trim()

    const genres = await movieService.getAllGenres()

    const paginator = await movieService.getMoviePaginator({ size: 24, page, filter, sort })

    return res.render('user/movies', {
      paginator,
      genres,
      title: 'Browse All Movies'
    })
  }

  async show (req, res) {
    const id = req.params.id

    const movie = await movieService.getMovieById(id)

    if (!movie) {
      return res.status(404).render('general/error', { status: 404, title: 'Movie Not Found' })
    }

    return res.render('user/movie', {
      movie,
      title: movie.title,
      relates: [],
      screenshots: [],
      url: config.app.url
    })
  }

  async master (req, res) {
    const id = req.params.id
    const content = await movieService.getMovieMasterContent(id, req.user)
    const cookie = await movieService.getUserMovieStreamAuthKey(req.user)
    res.cookie('auth', cookie, { maxAge: 21600000, httpOnly: true })
    return res.send(content)
  }
}
