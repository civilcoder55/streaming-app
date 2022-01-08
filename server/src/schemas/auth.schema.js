const { body } = require('express-validator')

module.exports = {
  register: [
    body('email').not().isEmpty().withMessage('email address is required').isEmail().withMessage('invalid email address').trim(),
    body('username')
      .custom((value) => !/\s/.test(value))
      .withMessage('No spaces are allowed in the username')
      .isLength({ min: 6 })
      .withMessage('the name must have minimum length of 6')
      .trim()
      .escape(),

    body('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one sepcial character'),

    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match')
      }
      return true
    }),
    body('agree').equals('on').withMessage('your should accept terms')
  ],

  forgetPassword: [
    body('email').not().isEmpty().withMessage('email address is required').isEmail().withMessage('invalid email address').trim()
  ],

  resetPassword: [
    body('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one sepcial character'),

    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match')
      }
      return true
    })
  ]
}
