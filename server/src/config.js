// required configs
const app = require('./configs/app.config')
const db = require('./configs/db.config')
const stripe = require('./configs/stripe.config')
const elasticsearch = require('./configs/elasticsearch.config')
const redis = require('./configs/redis.config')

// export all configs as one object
module.exports = {
  app,
  db,
  stripe,
  elasticsearch,
  redis
}
