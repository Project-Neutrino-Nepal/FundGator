const { check } = require("express-validator");

const name = check("name", "Name is required.").not().isEmpty().isAlpha();
const email = check("email", "Please provide a valid email address").isEmail();
const password = check(
  "password",
  "Password is required of minimum length of 6."
).isLength({
  min: 6,
});

module.exports = RegisterValidations = [password, name, email];
module.exports = LoginValidations = [email, password];
module.exports = ResetPassword = [email];
