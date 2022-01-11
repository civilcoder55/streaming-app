// required packages
const paginator = require('../database/elasticsearch/read')
const config = require('../config')
const jwt = require('jsonwebtoken')

// required models
const Movie = require('../models/movie.model')
const Genre = require('../models/genre.model')

module.exports = class MovieService {
  async getIndexPageMovies () {
    return await Movie.findAll({
      limit: 6,
      order: [['id', 'DESC']]
    })
  }

  async getMovieById (id) {
    return await Movie.findOne({
      where: { id }
    })
  }

  async getAllGenres () {
    return await Genre.findAll({ raw: true })
  }

  async getMoviePaginator ({ size, page, filter, sort }) {
    return await paginator({ size, page, filter, sort })
  }

  async getMovieMasterContent (id, user) {
    const url = config.app.url
    const rank = user?.subscription?.plan.rank || 0

    // for basic user load low and sd qualities
    let content = `#EXTM3U
#EXT-X-VERSION:4
#EXT-X-STREAM-INF:PROGRAM-ID=0,BANDWIDTH=398200,RESOLUTION=426x240,CLOSED-CAPTIONS=NONE
${url}/stream/${id}_0.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=0,BANDWIDTH=687500,RESOLUTION=640x360,CLOSED-CAPTIONS=NONE
${url}/stream/${id}_1.m3u8
`

    // if rank == 1 (Premium) or rank == 2 (Cinematic) append hd quality
    if (rank >= 1) {
      content += `#EXT-X-STREAM-INF:PROGRAM-ID=0,BANDWIDTH=1454200,RESOLUTION=1280x720,CLOSED-CAPTIONS=NONE
${url}/stream/${id}_2.m3u8
`
    }

    // if rank == 2 (Cinematic) append fhd quality
    if (rank >= 2) {
      content += `#EXT-X-STREAM-INF:PROGRAM-ID=0,BANDWIDTH=2332000,RESOLUTION=1920x1080,CLOSED-CAPTIONS=NONE
${url}/stream/${id}_3.m3u8`
    }

    return content
  }

  async getUserMovieStreamAuthKey (user) {
    const rank = user?.subscription?.plan.rank || 0
    return jwt.sign({ sub: `${rank + 1}` }, Buffer.from(config.app.secret, 'hex'), { expiresIn: '6h' })
  }
}
