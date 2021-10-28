// required packages
const router = require("express").Router();
// required controllers
const authController = require("../controllers/auth.controller");

// required middlewares
const redirectAuth = require("../middlewares/redirectAuth.middleware");
const requireAuth = require("../middlewares/requireAuth.middleware");
const validateBody = require("../middlewares/validateBody.middleware");

// required validation schema
const authSchema = require("../schemas/auth.validator");


module.exports = function (passport) {
  router.get("/signin", redirectAuth, authController.getLogin);
  router.get("/signup", redirectAuth, authController.getRegister);
  router.get("/forgot", redirectAuth, authController.getForget);
  router.get("/reset/:token", redirectAuth, authController.getResetPassword);
  router.get("/logout", requireAuth, authController.logout);
  router.post(
    "/signin",
    redirectAuth,
    passport.authenticate("local", { failureRedirect: "/signin", failureFlash: true }),
    authController.login
  );
  router.post("/signup", redirectAuth, validateBody(authSchema.register), authController.register);
  router.post("/forgot", redirectAuth, validateBody(authSchema.forgetPassword), authController.forgetPassword);
  router.post("/reset/:token", redirectAuth, validateBody(authSchema.resetPassword), authController.resetPassword);
  return router;
};
