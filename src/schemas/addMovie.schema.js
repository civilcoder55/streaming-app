const { body } = require("express-validator");


module.exports.addMovieValidator = [
    body("title").not().isEmpty().withMessage("title field is required").trim().escape(),
    body("desc").not().isEmpty().withMessage("desc field is required").trim().escape(),
    body("year").not().isEmpty().withMessage("year field is required").trim().escape(),
    body("time").not().isEmpty().withMessage("time field is required").isNumeric().withMessage("add correct time"),
    body("rate").not().isEmpty().withMessage("rate field is required").isDecimal().withMessage("add correct rate"),
    body("cover").custom((value, { req }) => {
        try {
            if (req.files.cover[0].mimetype == "image/jpeg" || req.files.cover[0].mimetype == "image/png") {
                return true;
            }
        } catch (error) { }

        throw new Error("Please upload valid cover photo");
    }),
    body("poster").custom((value, { req }) => {
        try {
            if (req.files.poster[0].mimetype == "image/jpeg" || req.files.poster[0].mimetype == "image/png") {
                return true;
            }
        } catch (error) { }

        throw new Error("Please upload valid poster photo");
    }),
];
