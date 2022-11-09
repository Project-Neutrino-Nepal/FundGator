// import { check } from "express-validator";
const { check } = require("express-validator");

const name = check("name", "Name is required.").not().isEmpty();
const username = check("username", "Username is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();
const password = check(
  "password",
  "Password is required of minimum length of 6."
).isLength({
  min: 6,
});

module.exports =  RegisterValidations = [password, name, username, email];
module.exports =  AuthenticateValidations = [username, password];
module.exports =  ResetPassword = [email];
