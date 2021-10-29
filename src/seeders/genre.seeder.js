// required models
const Genre = require("../models/genre.model");


const genres = ["Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western"
]


module.exports = function () {
    genres.forEach(genre => {
        Genre.findOrCreate({
            where: {
                title: genre,
            },
            defaults: { title: genre },
        });
    });
}