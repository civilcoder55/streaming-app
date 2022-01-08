// reqired packages
const app = require('./app')
const config = require('./config')
const sequelizeClient = require('./database/sequelize')
const elasticIntilizer = require('./database/elasticsearch/initializer')

// import database relationships
require('./database/relationships')

// import database seeders
const seeding = require('./database/seeders')

// register queues process
require('./queues/register')

// init elasticsearch
elasticIntilizer()

// start database then express app
sequelizeClient.sync().then(() => {
  console.log('[*] Database connected')
  seeding()
  app.listen(config.app.port, () => {
    console.log(`[*] App is running on port ${config.app.port}`)
  })
}).catch((err) => console.log(err))
