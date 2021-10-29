const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage({}),
  limits: { fieldSize: 5000000 },
});

const uploader = upload.fields([
  { name: "cover", maxCount: 1 },
  //{ name: "sub", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

module.exports = uploader;
