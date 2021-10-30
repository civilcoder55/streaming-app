// reqired packages
require("dotenv").config();


// stripe configs
module.exports = {
  token: process.env.STRIPE_TOKEN,
  secret: process.env.STRIPE_SECRET,
  success_url: "http://127.0.0.1:3000/plans",
  cancel_url: "http://127.0.0.1:3000/plans",
};

