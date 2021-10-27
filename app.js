// reqired packages
const config = require("./config");
const express = require("express");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelizeClient = require("./database/sequelize")
const passport = require('./utils/passport.util')


// init express app
const app = express();

//configure express app
app.disable("etag");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//register public folder as static
app.use(express.static(path.join(__dirname, "public")));

//register session/cookies middlewares
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(
    session({ secret: config.app.secret, resave: false, saveUninitialized: false, store: new SequelizeStore({ db: sequelizeClient }) })
);

//register session/cookies middlewares
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(
    session({ secret: config.app.secret, resave: false, saveUninitialized: false, store: new SequelizeStore({ db: sequelizeClient }) })
);
app.use(require("connect-flash")());

//register preconfigured passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());


//register and config csrf middleware
app.use(require("csurf")());
// inject csrf token in response locals to access it form views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.req = req;
  next();
});




module.exports = app