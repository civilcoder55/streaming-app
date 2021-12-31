// required seeders
const genreSeeder = require('../seeders/genre.seeder')
const planSeeder = require('../seeders/plan.seeder')

// register seeders
const seeders = [genreSeeder, planSeeder]

module.exports = function () {
  console.log('Seeding database started')
  seeders.forEach((seeder) => {
    seeder()
  })
  console.log('Seeding database finished')
}
