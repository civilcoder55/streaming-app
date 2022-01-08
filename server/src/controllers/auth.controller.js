// required services
const authService = new (require('../services/auth.service'))()

module.exports = class AuthController {
  getLogin (req, res) {
    return res.render('auth/signin', { title: 'Sign in' })
  }

  getRegister (req, res) {
    return res.render('auth/signup', { title: 'Sign up' })
  }

  getForget (req, res) {
    return res.render('auth/forget', { title: 'Forget Password' })
  }

  login (req, res) {
    req.body.remember === 'on' ? (req.session.cookie.maxAge = 2 * 24 * 3600000) : (req.session.cookie.expires = false)
    req.session.save(() => {
      return res.redirect('/')
    })
  }

  async register (req, res) {
    const { email, username, password } = req.body
    const userExist = await authService.checkIfUserExists(email, username)

    if (userExist) {
      userExist.username === username ? req.flash('error', 'Username already taken') : req.flash('error', 'Email already taken')
      return res.redirect('/signup')
    }

    const user = await authService.createUser(email, username, password)

    req.login(user, () => res.redirect('/'))
  }

  logout (req, res) {
    req.logout()
    req.session.destroy(() => res.redirect('/'))
  }

  async forgetPassword (req, res) {
    await authService.generateResetToken(req.body.email)
    req.flash('success', 'if you have email , then message with reset link will be sent to you ')
    req.session.save(() => {
      return res.redirect('/forgot')
    })
  }

  async getResetPassword (req, res) {
    const token = req.params.token
    if (token) {
      const isValid = await authService.verifyResetToken(token)
      if (isValid) {
        return res.render('auth/reset', { title: 'Reset Password' })
      }
    }
    return res.send('reset link is invalid or expired')
  }

  async resetPassword (req, res) {
    const token = req.params.token
    const { password } = req.body
    if (token) {
      const user = await authService.verifyResetToken(token)
      if (user) {
        await user.update({ password })
        await user.update({ resetToken: null })
        req.flash('success', 'your password has been reseted')
        return res.redirect('/signin')
      }
    }
    return res.send('reset link is invalid or expired')
  }
}
