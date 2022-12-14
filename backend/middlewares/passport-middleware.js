const passport = require("passport");
const User  = require("../models/userModel");
const { Strategy, ExtractJwt } = require("passport-jwt");
const  SECRET  = require("../constants/index");

const secretOrKey = SECRET;

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return done(null, user.getUserInfo());
    } catch (err) {
      done(null, false);
    }
  })
);
