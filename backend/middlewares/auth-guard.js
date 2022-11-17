const passport = require("passport");
const { SECRET: secretOrKey } = require("../constants/index");
const DOMAIN = "http://127.0.0.1:5000/";


const userAuth = passport.authenticate(secretOrKey, {
  session: false,
  failureRedirect: "http://127.0.0.1:3000/login",
});

module.exports = userAuth;