// required models
const User = require('../models/user.model')

module.exports = function () {
  User.findOrCreate({
    where: {
      username: 'admin12345'
    },
    defaults: { username: 'admin12345', email: 'admin@admin.com', password: '$2a$12$99KsKD/dGMbGNMxpbK4IsuL43FJghBv2rP08pIB7z2zmXexvgcscm', isAdmin: true } // password : Password123@
  })
}
