// required configs
const app = require("./configs/app.config");
const db = require("./configs/db.config")
const stripe = require("./configs/stripe.config")
// export all configs as one object
module.exports = {
    app,
    db,
    stripe,
};

