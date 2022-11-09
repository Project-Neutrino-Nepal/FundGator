const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { randomBytes } = require("crypto");
// const { join } = require("path");
const  DOMAIN  = require("../constants/index");
const sendMail = require("../functions/email-sender");
// const { userAuth } = require("../middlewares/auth-guard");
// const { uploadEventImage: uploader } = require("../middlewares/uploader");
// const Validator = require("../middlewares/validator-middleware");
// const {
//   AuthenticateValidations,
//   RegisterValidations,
//   ResetPassword,
// } = require("../validators/user-validators");

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

router.post(
  "/api/register",
  // RegisterValidations,
  // Validator,
  async (req, res) => {
    try {
      let { username, email } = req.body;
      // Check if the username is taken or not
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken.",
        });
      }
      // Check if the user exists with that email
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message:
            "Email is already registered. Did you forget the password. Try resetting it.",
        });
      }
      user = new User({
        ...req.body,
        verificationCode: randomBytes(20).toString("hex"),
      });
      await user.save();
      // Send the email to the user with a varification link
      let html = `
        <div>
            <h1>Hello, ${user.username}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${DOMAIN}users/verify-now/${user.verificationCode}">Verify Now</a>
        </div>
    `;
      await sendMail(
        user.email,
        "Verify Account",
        "Please verify Your Account.",
        html
      );
      return res.status(201).json({
        success: true,
        message:
          "Hurray! your account is created please verify your email address.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
);

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */




























module.exports = router;
