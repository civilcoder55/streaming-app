// reqired packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const Op = require("sequelize").Op;



// config passport local strategy to authenticate user
passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const user = await User.findOne({
                where: { [Op.or]: [{ username: username }, { email: username }] },
            });

            if (!user) {
                return done(null, false, {
                    message: "Incorrect credentials details .",
                });
            }
            const pass = await user.validPassword(password);
            if (pass) {
                return done(null, user); //success
            } else {
                return done(null, false, { message: "Incorrect credentials details ." });
            }
        } catch (error) {
            return done(err);
        }
    })
);


// config passport serializer
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// config passport deserializer from database by user id
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findOne({
            where: { id },
        });
        user = user.get({ plain: true });
        delete user.password;
        done(null, user);
    } catch (error) {
        return done(err);
    }
});

module.exports = passport;
