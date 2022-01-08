// required models
const User = require('../models/user.model')

module.exports = class ProfileService {
  async updateProfile ({ user, body }) {
    const { email, firstname, lastname } = body
    if (user.email !== email) {
      const userExist = await User.findOne({
        where: { email }
      })
      if (userExist) {
        throw new Error('email already taken')
      }
    }

    await User.update({ email, firstname, lastname }, { where: { id: user.id } })
  }

  async updatePassword ({ user, body }) {
    const { oldpass, newpass } = body
    const userObj = user = await User.findOne({ where: { id: user.id } })
    const valid = await userObj.validPassword(oldpass)

    if (valid) {
      return await userObj.update({ password: newpass })
    }

    throw new Error('Old password is incorrect')
  }
}
