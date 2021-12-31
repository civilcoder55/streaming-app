const { validationResult } = require('express-validator')

function validate (req, res, next) {
  const error = validationResult(req).formatWith(({ msg }) => msg)
  if (!error.isEmpty()) {
    console.log(error.array())
    req.flash('error', error.array())
    return res.redirect(req.originalUrl)
  }
  next()
}
module.exports = (validatorList) => {
  validatorList.push(validate)
  return validatorList
}
