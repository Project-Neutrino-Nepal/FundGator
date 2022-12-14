const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { randomBytes } = require("crypto");
const { join } = require("path");
// const DOMAIN = require("../constants/index") || "http://127.0.0.1:5000/";
const sendMail = require("../functions/email-sender");
const DOMAIN = "http://127.0.0.1:5000/";
const RegisterValidations = require("../validators/user-validators");
const validator = require("../middlewares/validator-middleware");
const userAuth = require("../middlewares/auth-guard");
const { body } = require("express-validator");

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

router.post(
  "/api/register",
  RegisterValidations,
  validator,
  async (req, res) => {
    try {
      let { email } = req.body;

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
      const link = `${DOMAIN}users/verify-now/${user.verificationCode}`;
      // Send the email to the user with a varification link
      let html = `
        <div>
            <h1>Hello, ${user.name}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${link}">Verify Now</a>
        </div>
    `;
      await sendMail(
        user.email,
        "Verify Account",
        "Please verify Your Account.",
        html
      );
      // create profile for the user
      const profile = new Profile({
        user: user._id,
        email: user.email,
        name: user.name,
      });
      await profile.save();

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
 * @description To login a User
 * @api /users/api/login
 * @access PUBLIC
 * @type POST
 */

router.post("/api/login", LoginValidations, validator, async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    if (user.status != true) {
      return res.status(401).json({
        success: false,
        message:
          "Your account is suspended, Please contact Admin to Reactivate your Account.",
      });
    }
    if (user.verified != true) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access. Please verify your account email has been sent.",
      });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
      message: "Hurray! You are now logged in.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To verify a new user's account via email
 * @api /users/verify-now/:verificationCode
 * @access PUBLIC <Only Via email>
 * @type GET
 */

router.get("/verify-now/:verificationCode", async (req, res) => {
  try {
    let { verificationCode } = req.params;
    let user = await User.findOne({ verificationCode });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Invalid verification code.",
      });
    }
    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    return res.sendFile(
      join(__dirname, "../templates/verification-success.html")
    );
  } catch (err) {
    console.log("ERR", err.message);
    return res.sendFile(join(__dirname, "../templates/errors.html"));
  }
});

/**
 * @description To update a user
 * @api /users/api/update-user
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/update-user/:name", async (req, res) => {
  try {
    let { name } = req.params;
    let profile = await Profile.findOne({
      name,
    });
    const user = profile.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let updateUser = await User.findByIdAndUpdate(
      user,
      {
        isFirstTime: false,
      },
      { new: true }
    );
    return res.status(200).json({
      updateUser,
      success: true,
      message: "Hurray! Your account has been updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To get number of users
 * @api /users/api/get-no-users
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-no-users", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const noUsers = await User.countDocuments();
    return res.status(200).json({
      noUsers,
      success: true,
      message: "Hurray! Your account has been updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To suspend a user account by admin
 * @api /users/api/suspend-user/:userId
 * @access PRIVATE
 * @type PUT
 */

router.put("/api/suspend/:userId", async (req, res) => {
  try {
    let { userId } = req.params;
    let userToSuspend = await User.findById(userId);
    if (!userToSuspend) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    userToSuspend.status = false;
    await userToSuspend.save();
    return res.status(200).json({
      success: true,
      message: "Hurray! User account has been suspended.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To unsuspend a user
 * @api /users/api/activate/:userId
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/activate/:userId", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.userId, {
      status: true,
    });
    return res.status(200).json({
      updateUser,
      success: true,
      message: "User has been activated! Successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      success: false,
      message: "An error occurred.",
    });
  }
});

module.exports = router;
