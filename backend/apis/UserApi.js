const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { randomBytes } = require("crypto");
const { join } = require("path");
// const DOMAIN = require("../constants/index") || "http://127.0.0.1:5000/";
const sendMail = require("../functions/email-sender");
const DOMAIN = "http://127.0.0.1:5000/";

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
      // then create profile for the user

      
     
   
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

router.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email address.",
      });
    }
    let isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      message: "Login Successful.",
      token,
      user: user.getUserInfo(),
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

router.put("/api/test/:id",  async (req, res) => {
  try {
      let { name
          , email
          , phone,
          address 
      } = req.body;
      const profile = await Profile.findById(req.params._id);
      if (!profile) {
          return res.status(400).json({
              success: false,
              message: "User not found.",
          });
      }
      profile.name = name;
      profile.email = email;
      profile.phone = phone;
      profile.address = address;
      await user.save();
      return res.status(200).json({
          success: true,
          message: "Profile updated successfully.",
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          success: false,
          message: "An error occurred.",
      });
      
         
  }
});





module.exports = router;
