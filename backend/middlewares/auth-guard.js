const passport = require("passport");
const { SECRET: secretOrKey } = require("../constants/index");


const userAuth = passport.authenticate(secretOrKey, {
  session: false,
  failureRedirect: "/users/api/login",
});

module.exports = userAuth;