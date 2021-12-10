//required packages
const client = require('./client')




module.exports = async function (movie) {
    await client.updateByQuery({
        index: 'movies',
        body:
        {
            "conflicts": "proceed",
            "script": {
                "source": "ctx._source.id=(params.id);ctx._source.title = (params.title);ctx._source.year = (params.year);ctx._source.country = (params.country);ctx._source.rate = (params.rate);ctx._source.description = (params.description);ctx._source.duration = (params.duration);ctx._source.genres = (params.genres);",
                "params": {
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    rate: movie.rate,
                    country: movie.country,
                    description: movie.description,
                    duration: movie.duration,
                    genres: movie.genres.split(',')
                }
            }
            , "query": {
                "term": {
                    "id": movie.id
                }
            }
        }
    })
}