// reqired packages
require("dotenv").config();


// app configs
module.exports = {
  name: process.env.APP_NAME,
  env: process.env.APP_ENV || "local",
  url: process.env.APP_URL,
  port: process.env.APP_PORT || 3000,
};

