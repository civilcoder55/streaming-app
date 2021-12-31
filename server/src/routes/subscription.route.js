// required packages
const router = require('express').Router()

// required controllers
const subscriptionController = new (require('../controllers/subscription.controller'))()

// required middlewares
const requireAuth = require('../middlewares/requireAuth.middleware')

// required validation schema

router.get('/plans', subscriptionController.index)
router.post('/plan/:id', requireAuth, subscriptionController.subscribe)
router.post('/checkout/webhook', subscriptionController.hook)

module.exports = router
