const config = require("../config");
const loginPath = config.app.loginPath;

module.exports = function (req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect(loginPath);
  }
  next();
};
