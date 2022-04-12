// required services
const adminMovieService = new (require('../../services/admin/movie.service'))()

module.exports = class AdminMovieController {
  async index (req, res) {
    const page = req.query.page
    const paginator = await adminMovieService.getMoviePaginator({ limit: 10, page })
    return res.render('admin/movies/index', { paginator })
  }

  async create (req, res) {
    const genres = await adminMovieService.getAllGenres()
    return res.render('admin/movies/create', { genres })
  }

  async store (req, res) {
    try {
      await adminMovieService.createMovie({ body: req.body, files: req.files })
      return res.redirect('/admin/movies')
    } catch (error) {
      console.log(error)
      req.flash('error', error.message)
      return res.redirect('/admin/movies/add')
    }
  }

  async parse (req, res) {
    const response = await adminMovieService.parseImdbMovie({ url: req.body.url })
    return res.json(response)
  }

  async edit (req, res) {
    const id = req.params.id
    const movie = await adminMovieService.getMovieData(id)
    if (!movie) {
      return res.render('general/error', { status: 404, title: 'Movie Not Found' })
    }
    const genres = await adminMovieService.getAllGenres()
    return res.render('admin/movies/edit', { movie, genres })
  }

  async update (req, res) {
    const id = req.params.id
    await adminMovieService.updateMovie({ id, body: req.body, files: req.files })
    return res.redirect('/admin/movies')
  }

  async delete (req, res) {
    const id = req.params.id
    await adminMovieService.deleteMovie(id)
    return res.redirect('/admin/movies')
  }

  async upload (req, res) {
    const id = req.params.id
    await adminMovieService.uploadMovie(id, req.files)
    req.flash('success', `File uploaded for movie with id ${id}`)
    req.session.save(() => {
      return res.redirect('/admin/movies')
    })
  }

  async transcode (req, res) {
    const id = req.params.id
    await adminMovieService.transcodeMovie(id)
    req.flash('success', `Movie with ${id} added to transcoding queue`)
    req.session.save(() => {
      return res.redirect('/admin/movies')
    })
  }
}
