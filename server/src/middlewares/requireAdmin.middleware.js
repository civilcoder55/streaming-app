module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next()
    }
  }
  return res.redirect('/')
}
