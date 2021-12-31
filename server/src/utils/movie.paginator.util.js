const Movie = require('../models/movie.model')

module.exports = async function ({ limit, page, orderBy }) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 6

  const count = await Movie.count({})
  const pages = Math.ceil(count / limit)
  const hasOther = pages > 1
  const hasNext = !!(page < pages && hasOther)
  const hasPerv = !!(page > 1 && hasOther)
  const offset = (page - 1) * limit
  if (page > pages) {
    page = pages
  }
  const records = await Movie.findAll({
    subQuery: false,
    limit: limit,
    offset: offset,
    order: orderBy
  })

  return {
    records,
    page,
    pages,
    hasOther,
    hasNext,
    hasPerv,
    count
  }
}
