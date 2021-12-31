const sharp = require("sharp")

module.exports = function ({ buffer, x, y, path }) {
    sharp(buffer)
        .resize(x, y)
        .png()
        .toFile(path, (err, info) => { if (err) console.log(err); });
};