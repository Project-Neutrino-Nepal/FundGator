const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const Profile = require("../../models/profileModel");
const RegisterValidations = require("../../validators/user-validators");
const validator = require("../../middlewares/validator-middleware");
const userAuth = require("../../middlewares/auth-guard");

/**
 * @description To register Admin
 * @api /admin/api/register
 * @access public
 * @type post
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
        verified: true,
        admin: true,
        ...req.body,
      });
      await user.save();

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
          "Hurray! your account is created as Admin.",
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
 * @description To login Admin to system
 * @api /admin/api/login
 * @access public
 * @type post
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
    if (user.verified != true) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please verify your account.",
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
 * @description To get admin profile
 * @api /admin/api/profile
 * @access private
 * @type get
 * */

router.get("/api/profile", userAuth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        if (user.admin == true) {
            user = await User.findById(req.user._id);
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access.",
            });
        }
        return res.status(200).json({
            success: true,
            user,
            message: "Admin Profile fetched successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
});

module.exports = router;
