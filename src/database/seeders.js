// register seeders 

const genreSeeder = require("../seeders/genre.seeder")


const seeders = [genreSeeder]

module.exports = function () {
    console.log("Seeding database started")
    seeders.forEach((seeder) => {
        seeder()
    })
    console.log("Seeding database finished")
}



