// required packages
const client = require('./client')

module.exports = async function (movie) {
  await client.index({
    index: 'movies',
    body: {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      rate: movie.rate,
      poster: movie.poster,
      cover: movie.cover,
      country: movie.country,
      description: movie.description,
      duration: movie.duration,
      genres: movie.genres.split(',')
    }
  })
}
