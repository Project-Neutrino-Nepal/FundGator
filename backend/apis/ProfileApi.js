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
 * @type PUT
 */

router.put("/api/update-profile", userAuth, validator, async (req, res) => {
  try {
    let { body } = req;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        ...body,
      },
      { new: true }
    );

    return res.status(200).json({
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
});

/**
 * @description To upload profile of user
 * @api /users/api/update-profile-image
 * @access PRIVATE
 * @type PUT <multipart-form> request
 */

router.put(
  "/api/update-profile-image",
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
      //  if file is not uploaded then dont update the avatar
      if (file === null || file === undefined) {
        return res.status(400).json({
          success: true,
          message: "Image format not supported",
          data: updatedProfile,
        });
      } else {
        filename = DOMAIN + "uploads/profile-images/" + file.filename;
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          {
            ...body,
            avatar: filename,
          },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          data: updatedProfile,
        });
      }
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

//to get single profile
router.get("/api/get-profile/:id", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    let profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "No profile found.",
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
 * @description To Get or Search All users
 * @api /profiles/api/get-users
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-users", userAuth, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Find and return users except current user
  const userExists = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .exec();

  return res.status(200).json(userExists);
});

/**
 * @description To Get or Search All profiles by name or email
 * @api /profiles/api/get-profiles
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/profiles", userAuth, async (req, res) => {
  const keyword = req.query.search;

  let profile = await Profile.find({
    $and: [
      {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      },
      { user: { $ne: req.user._id } },
    ],
  }).populate("user", ["name", "email"]);

  return res.status(200).json(profile);
});

/**
 * @description To Get Other users profile by id in params
 * @api /profiles/api/get-other-profiles
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-other-profiles/:id", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    let profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "No profile found.",
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

module.exports = router;
