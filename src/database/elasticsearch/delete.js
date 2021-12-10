//required packages
const client = require('./client')




module.exports = async function (movieId) {
    await client.deleteByQuery({
        index: 'movies',
        body: {
            "query": {
                "term": {
                    "id": movieId
                }
            }
        }
    })
}