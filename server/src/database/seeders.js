// required seeders
const genreSeeder = require('../seeders/genre.seeder')
const planSeeder = require('../seeders/plan.seeder')
const adminSeeder = require('../seeders/admin.seeder')

// register seeders
const seeders = [genreSeeder, planSeeder, adminSeeder]

module.exports = function () {
  seeders.forEach((seeder) => {
    seeder()
  })
  console.log('[*] Seeding database finished')
}
