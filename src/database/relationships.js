// required models 
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");
const Plan = require("../models/plan.model");
const Subscription = require("../models/subscription.model");
const User = require("../models/user.model")


// movies Many to many relationship with genres
Movie.belongsToMany(Genre, { through: "movie_genre" });
Genre.belongsToMany(Movie, { through: "movie_genre" });


// subscriptions One to many relationship with plans
Subscription.belongsTo(Plan, {
    foreignKey: {
        allowNull: false,
        defaultValue: 1,
    },
});
Plan.hasMany(Subscription);


// users One to one relationship with Subscription table
Subscription.belongsTo(User, { onDelete: "CASCADE", hooks: true });
User.hasOne(Subscription);