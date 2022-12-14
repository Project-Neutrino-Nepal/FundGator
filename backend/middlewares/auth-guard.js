const passport = require("passport");
const DOMAIN = "http://127.0.0.1:3000/";

const userAuth = passport.authenticate("jwt", {
  session: false,
  failureRedirect: DOMAIN + "login",
});

module.exports = userAuth;
