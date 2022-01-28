// reqired packages
require('dotenv').config()

// stripe configs
module.exports = {
  token: process.env.STRIPE_TOKEN,
  secret: process.env.STRIPE_SECRET,
  success_url: process.env.SUCCESS_URL,
  cancel_url: process.env.CANCEL_URL
}
