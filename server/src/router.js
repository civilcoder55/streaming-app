// required packages
const router = require('express').Router()
const passport = require('./utils/passport.util')

// register all routes
router.use(require('./routes/auth.route')(passport))
router.use(require('./routes/movie.route'))
router.use('/admin', require('./routes/admin.route'))
router.use(require('./routes/subscription.route'))

module.exports = router
