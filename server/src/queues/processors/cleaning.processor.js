
const fs = require('fs')
const Movie = require('../../models/movie.model')

module.exports = async function (job) {
  fs.unlink(job.data.filepath, err => console.log(err))
  const movie = await Movie.findOne({ where: { id: job.data.id } })
  await movie.update({ transcoded: true, tempPath: null })
  return Promise.resolve('success')
}
