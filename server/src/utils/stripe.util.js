// required packages
const stripe = require('stripe')
const config = require('../config')

const stripeClient = stripe(config.stripe.token)

module.exports = stripeClient
