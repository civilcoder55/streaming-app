// reqired packages
require('dotenv').config()

// redis configs
module.exports = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
}
