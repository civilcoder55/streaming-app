const { body } = require('express-validator')

module.exports = {
  store: [
    body('title').not().isEmpty().withMessage('title field is required').trim().escape(),
    body('description').not().isEmpty().withMessage('description field is required').trim().escape(),
    body('year').not().isEmpty().withMessage('year field is required').trim().escape(),
    body('duration').not().isEmpty().withMessage('duration field is required'),
    body('rate').not().isEmpty().withMessage('rate field is required').isDecimal().withMessage('add correct rate'),
    body('cover').custom((value, { req }) => {
      if (req.files.cover[0]?.mimetype === 'image/jpeg' || req.files.cover[0]?.mimetype === 'image/png') {
        return true
      }
      throw new Error('Please upload valid cover photo')
    }),
    body('poster').custom((value, { req }) => {
      if (req.files.poster[0]?.mimetype === 'image/jpeg' || req.files.poster[0]?.mimetype === 'image/png') {
        return true
      }
      throw new Error('Please upload valid poster photo')
    })
  ],
  update: [
    body('title').not().isEmpty().withMessage('title field is required').trim().escape(),
    body('description').not().isEmpty().withMessage('description field is required').trim().escape(),
    body('year').not().isEmpty().withMessage('year field is required').trim().escape(),
    body('duration').not().isEmpty().withMessage('duration field is required'),
    body('rate').not().isEmpty().withMessage('rate field is required').isDecimal().withMessage('add correct rate'),
    body('cover').custom((value, { req }) => {
      if (req.files?.cover) {
        if (req.files.cover[0]?.mimetype === 'image/jpeg' || req.files.cover[0]?.mimetype === 'image/png') {
          return true
        }
        throw new Error('Please upload valid cover photo')
      }
      return true
    }),
    body('poster').custom((value, { req }) => {
      if (req.files?.poster) {
        if (req.files.poster[0]?.mimetype === 'image/jpeg' || req.files.poster[0]?.mimetype === 'image/png') {
          return true
        }
        throw new Error('Please upload valid poster photo')
      }
      return true
    })
  ]
}
