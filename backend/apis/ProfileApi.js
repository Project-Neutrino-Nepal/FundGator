const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const userAuth = require("../middlewares/auth-guard");
/**
 * @description To edit authenticated user profile
 * @api /users/api/update-profile
 * @access PRIVATE
 * @type PUT
 */

router.put("/api/update-profile", userAuth, async (req, res) => {
  try {
    let { body } = req;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedProfile = await Profile.updateMany(
      { user: req.user._id },
      {
        ...body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

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

module.exports = router;
