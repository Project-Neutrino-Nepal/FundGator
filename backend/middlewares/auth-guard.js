const passport = require("passport");

userAuth = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "users/api/login",
});

module.exports = userAuth;