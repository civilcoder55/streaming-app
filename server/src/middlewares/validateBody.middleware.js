const { validationResult } = require('express-validator')

function validate (req, res, next) {
  const error = validationResult(req).formatWith(({ msg }) => msg)
  if (!error.isEmpty()) {
    req.flash('error', error.array())
    if (req.originalUrl === '/change-password') {
      return res.redirect('/profile')
    }
    return res.redirect(req.originalUrl)
  }
  next()
}
module.exports = (validatorList) => {
  validatorList.push(validate)
  return validatorList
}
