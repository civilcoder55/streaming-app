// reqired packages
const express = require("express");
const path = require("path");


// init express app
const app = express();

//configure express app
app.disable("etag");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app general middlewares
app.use(express.static(path.join(__dirname, "public")));

module.exports = app