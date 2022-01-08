// required services
const profileService = new (require('../services/profile.service'))()

module.exports = class ProfileController {
  async index (req, res) {
    return res.render('user/profile', { title: 'My Profile' })
  }

  async update (req, res) {
    try {
      await profileService.updateProfile({ user: req.user, body: req.body })
      req.flash('success', 'Info saved successfuly')
    } catch (error) {
      req.flash('error', error.message)
    }

    return res.redirect('/profile')
  }

  async updatePassword (req, res) {
    try {
      await profileService.updatePassword({ user: req.user, body: req.body })
      const maxAge = req.session.cookie.maxAge
      return req.session.regenerate(_err => {
        req.session.reload(_err => {
          req.login(req.user, _err => {})
          req.session.cookie.maxAge = maxAge
          req.flash('success', 'Password changed successfuly')
          req.session.save(_err => {
            res.redirect('/profile')
          })
        })
      })
    } catch (error) {
      req.flash('error', error.message)
      return res.redirect('/profile')
    }
  }
}
