// required packages
const client = require('./client')

const SORT = {
  Recent: { id: { order: 'desc' } },
  Rating: { rate: { order: 'desc' } },
  Year: { year: { order: 'desc' } }
}

const getMovies = async ({ size, from, query, sortBy }) => {
  const sort = []
  if (SORT[sortBy]) {
    sort.push(SORT[sortBy])
  }

  console.log(JSON.stringify({
    index: 'movies',
    body: {
      size,
      from,
      query,
      sort
    }
  }))

  const result = await client.search({
    index: 'movies',
    body: {
      size,
      from,
      query,
      sort
    }
  })

  return result?.body?.hits?.hits
}

const getMoviesCount = async (query) => {
  const result = await client.count({
    index: 'movies',
    body: {
      query
    }
  })

  return result?.body?.count
}

const buildFilterQuery = ({ genre, rate, year, q }) => {
  const query = {
    bool: {
      must: [

      ],
      filter: [
      ]
    }
  }
  if (q) {
    query.bool.must.push({
      multi_match: {
        query: q,
        fields: ['title', 'description']
      }
    })
  } else {
    query.bool.must.push({ match_all: {} })
  }

  if (genre) {
    query.bool.filter.push({ term: { genres: genre } })
  }
  if (rate) {
    query.bool.filter.push({ range: { rate: { gte: rate } } })
  }

  if (year) {
    query.bool.filter.push({ term: { year: year } })
  }

  return query
}

const paginator = async ({ size, page, filter, sort }) => {
  page = parseInt(page) || 1
  size = parseInt(size) || 24

  const filterQuery = buildFilterQuery({ ...filter })
  let count = await getMoviesCount(filterQuery)
  count = count > 10000 ? 10000 : count

  const pages = Math.ceil(count / size)

  const hasOther = pages > 1
  const hasNext = !!(page < pages && hasOther)
  const hasPerv = !!(page > 1 && hasOther)

  const from = (page - 1) * size <= 10000 ? (page - 1) * size : 10000 - size

  if (page > pages) {
    page = pages
  }

  const records = await getMovies({ size, from, query: filterQuery, sortBy: sort })

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

module.exports = paginator
