// required packages
const router = require('express').Router()

// required controllers
const profileController = new (require('../controllers/profile.controller'))()

// required middlewares
const requireAuth = require('../middlewares/requireAuth.middleware')
const validateBody = require('../middlewares/validateBody.middleware')

// required validation schema
const profileSchema = require('../schemas/profile.schema')

router.get('/profile', requireAuth, profileController.index)
router.post('/profile', requireAuth, validateBody(profileSchema.updateProfile), profileController.update)
router.post('/change-password', requireAuth, validateBody(profileSchema.updatePassword), profileController.updatePassword)

module.exports = router
