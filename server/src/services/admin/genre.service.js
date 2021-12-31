// required models
const Genre = require('../../models/genre.model')

module.exports = class AdminGenreService {
  async getAllGenres () {
    return await Genre.findAll({ raw: true })
  }

  async createGenre (title) {
    let validTitle = title.trim().toLowerCase()
    validTitle = validTitle.charAt(0).toUpperCase() + validTitle.slice(1)
    if (validTitle) {
      await Genre.findOrCreate({
        where: {
          title: validTitle
        },
        defaults: { title: validTitle }
      })
    }
    return true
  }

  async updateGenre ({ id, title }) {
    const genre = await Genre.findOne({ where: { id } })
    if (genre && title) {
      let validTitle = title.trim().toLowerCase()
      validTitle = validTitle.charAt(0).toUpperCase() + validTitle.slice(1)
      if (validTitle) {
        await genre.update({ title })
      }
    }
    return true
  }

  async deleteGenre (id) {
    return await Genre.destroy({ where: { id } })
  }
}
