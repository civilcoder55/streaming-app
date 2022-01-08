// required packages
const moviePaginator = require('../../utils/movie.paginator.util')
const imageResizer = require('../../utils/resizer.util')
const path = require('path')

// required models
const Movie = require('../../models/movie.model')
const Genre = require('../../models/genre.model')

// required elasticsearch
const elCreate = require('../../database/elasticsearch/create')
const elDelete = require('../../database/elasticsearch/delete')
const elupdate = require('../../database/elasticsearch/update')

// required queues
const { transcodingQueue } = require('../../queues/queue')

module.exports = class AdminMovieService {
  async getMoviePaginator ({ limit, page }) {
    return await moviePaginator({ limit, page, orderBy: [['id', 'DESC']] })
  }

  async getAllGenres () {
    return await Genre.findAll({ raw: true })
  }

  async createMovie ({ body, files }) {
    const { title, description, year, genres, country, duration, rate } = body
    const movie = await Movie.create({ title, description, year, country, duration, rate })
    imageResizer({ buffer: files.cover[0].buffer, x: 270, y: 400, path: path.join(__dirname, `../../public/img/covers/${movie.id}.png`) })
    imageResizer({ buffer: files.poster[0].buffer, x: 540, y: 308, path: path.join(__dirname, `../../public/img/posters/${movie.id}.png`) })

    // if (files.sub) {
    //   SubtitleHandler({ buffer: req.files.sub[0].buffer, path: `./data/${movie.id}/${movie.id}.vtt` });
    // }

    // add genres to the movie
    let _genres
    if (genres) {
      _genres = Array.isArray(genres) ? genres.join(',') : genres
    }

    movie.update({ poster: `/img/posters/${movie.id}.png`, cover: `/img/covers/${movie.id}.png`, genres: _genres })

    await elCreate(movie)

    return movie
  }

  async getMovieData (id) {
    return await Movie.findOne({ where: { id } })
  }

  async updateMovie ({ id, body, files }) {
    const { title, description, year, genres, country, duration, rate } = body
    const movie = await Movie.findOne({ where: { id } })
    if (!movie) {
      throw new Error('Movie not found')
    }

    let _genres
    if (genres) {
      _genres = Array.isArray(genres) ? genres.join(',') : genres
    }

    await movie.update({ title, description, year, country, duration, rate, genres: _genres })

    if (files.cover) {
      imageResizer({ buffer: files.cover[0].buffer, x: 270, y: 400, path: path.join(__dirname, `../../public/img/covers/${movie.id}.png`) })
    } else if (files.poster) {
      imageResizer({ buffer: files.poster[0].buffer, x: 540, y: 308, path: path.join(__dirname, `../../public/img/posters/${movie.id}.png`) })
    } else if (files.sub) {
      // SubtitleHandler({ buffer: req.files.sub[0].buffer, path: `./data/${movie.id}/${movie.id}.vtt` });
    }

    await elupdate(movie)
    return movie
  }

  async deleteMovie (id) {
    await elDelete(id)
    await Movie.destroy({ where: { id } })
  }

  async uploadMovie (id, files) {
    const movie = await Movie.findOne({ where: { id } })
    await movie.update({ downloaded: true, tempPath: files.file[0].path })
    transcodingQueue.add({ id: movie.id, title: movie.title, filepath: files.file[0].path, quality: 0 })
  }

  async transcodeMovie (id) {
    const movie = await Movie.findOne({ where: { id } })
    transcodingQueue.add({ id: movie.id, title: movie.title, filepath: movie.tempPath, quality: 0 })
  }
}
