const multer = require('multer')
const path = require('path')

const imageUploadOptions = multer({
  storage: multer.memoryStorage({}),
  limits: { fieldSize: 5000000 }
})

const movieUploadOptions = multer({
  dest: path.join(__dirname, '../../../media/tmp')
})

const imageUploader = imageUploadOptions.fields([
  { name: 'cover', maxCount: 1 },
  // { name: "sub", maxCount: 1 },
  { name: 'poster', maxCount: 1 }
])

const movieUploader = movieUploadOptions.fields([
  { name: 'file', maxCount: 1 }
])

module.exports = { imageUploader, movieUploader }
