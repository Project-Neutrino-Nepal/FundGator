const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const userAuth = require("../middleware/userAuth");

/**
 * @description To Edit a Investor's Profile
 * @api /users/api/edit-profile
 * @access PRIVATE
 * @type POST
 */

router.put("/api/edit-profile/:id", async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      address,
      bio,
      status,
      skills,
      passport_No,
      passport_Issue_country,
      passport_Issue_date,
      passport_Expiry,
      tax_ID_No,
    } = req.body;
    let profile = await Profile.findOneAndUpdate({ _id: req.params.id });
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
    profile.bio = bio;
    profile.status = status;
    profile.skills = skills;
    profile.passport_No = passport_No;
    profile.passport_Issue_country = passport_Issue_country;
    profile.passport_Issue_date = passport_Issue_date;
    profile.passport_Expiry = passport_Expiry;
    profile.tax_ID_No = tax_ID_No;

    await profile.save();
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


/**
 * @description To retrive a Investor's Profile by ID
 * @api /users/api/profile
 * @access PRIVATE
 * @type GET
 */

router.get("/api/profile/:id", userAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile Retrieved Successfully",
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

router.delete("/api/delete-profile/:id", userAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }
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

