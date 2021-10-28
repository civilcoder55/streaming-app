// required models 
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");


// Many to many relationship with genres
Movie.belongsToMany(Genre, { through: "movie_genre" });
Genre.belongsToMany(Movie, { through: "movie_genre" });


