// required packages
const router = require("express").Router();
const passport = require("./utils/passport.util");


// register all routes 
router.use(require("./routes/auth.route")(passport));


module.exports = router;