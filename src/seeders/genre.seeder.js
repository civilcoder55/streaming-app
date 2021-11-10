// required models
const Genre = require("../models/genre.model");


const genres = [
    "Action", "Adventure", "Animation", "Biography",
    "Comedy", "Crime", "Documentary", "Drama",
    "Family", "Fantasy", "Film-Noir", "Game-Show",
    "History", "Horror", "Music", "Musical",
    "Mystery", "News", "Reality-TV", "Romance",
    "Sci-Fi", "Sport", "Talk-Show", "Thriller",
    "War", "Western"
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