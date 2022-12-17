const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const userAuth = require("../middlewares/auth-guard");
const uploadProfileImage =
  require("../middlewares/uploader").uploadProfileImage;
const validator = require("../middlewares/validator-middleware");
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To edit authenticated user profile
 * @api /users/api/update-profile
 * @access PRIVATE
 * @type PUT <multipart-form> request
 */

router.put(
  "/api/update-profile",
  userAuth,
  uploadProfileImage.single("avatar"),
  validator,
  async (req, res) => {
    try {
      let { body } = req;

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      let file = req.file;
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_userProfile.png";
      } else {
        filename = DOMAIN + "uploads/profile-images/" + file.filename;
      }
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          ...body,
          avatar: filename,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * @description To update multiple CIT Image of authenticated user profile
 * @api /users/api/update-cit-image
 * @access PRIVATE
 * @type PUT <multipart-form> request
 */

router.put(
  "/api/update-cit-image",
  userAuth,
  uploadProfileImage.fields([
    { name: "cit_front", maxCount: 1 },
    { name: "cit_back", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let cit_front = req.files.cit_front[0];
      let cit_back = req.files.cit_back[0];
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (cit_front === undefined || cit_front === null) {
        cit_front = DOMAIN + "uploads/assets/" + "default_cit_front.png";
      } else {
        cit_front = DOMAIN + "uploads/profile-images/" + cit_front.filename;
      }

      if (cit_back === undefined || cit_back === null) {
        cit_back = DOMAIN + "uploads/assets/" + "default_cit_back.png";
      } else {
        cit_back = DOMAIN + "uploads/profile-images/" + cit_back.filename;
      }

      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          cit_front,
          cit_back,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully with image",
        data: updatedProfile,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * @description To get authenticated user's profile
 * @api /profile/api/my-profile
 * @access PRIVATE
 * @type GET
 */

router.get("/api/my-profile", userAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      profile,
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
 * @description To Delete a Investor's Profile
 * @api /users/api/delete-profile
 * @access PRIVATE
 * @type DELETE
 */

router.delete("/api/delete-profile/", userAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }
    await user.remove();
    await profile.remove();
    return res.status(200).json({
      success: true,
      message: "Profile Deleted Successfully",
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
 * @description To get all users profile
 * @api /profile/api/get-profiles
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-profiles", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    let profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "admin",
      "status",
      "createdAt",
    ]);
    if (!profiles) {
      return res.status(400).json({
        success: false,
        message: "No profiles found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profiles fetched successfully.",
      profiles,
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
