const { body } = require('express-validator')

module.exports = {
  updateProfile: [
    body('email').not().isEmpty().withMessage('email address is required').isEmail().withMessage('invalid email address').trim(),
    body('firstname').trim(),
    body('lastname').trim()
  ],
  updatePassword: [
    body('oldpass').not().isEmpty().withMessage('old password is required'),
    body('newpass')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one sepcial character'),

    body('confirmpass').custom((value, { req }) => {
      if (value !== req.body.newpass) {
        throw new Error('confirm password does not match')
      }
      return true
    })
  ]
}
