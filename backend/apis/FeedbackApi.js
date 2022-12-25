const express = require("express");
const router = express.Router();
const FeedBack = require("../models/feedbackModel");
const Company = require("../models/companyModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const userAuth = require("../middlewares/auth-guard");

/**
 * @description To create Feedback for a company
 * @api /feedback/api/create-feedback
 * @access PRIVATE
 * @type POST
 */

router.post("/api/create-feedback/:id", userAuth, async (req, res) => {
  try {
    const { feedback } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    // check if user has previously posted feedback for this company
    const checkFeedback = await FeedBack.findOne({
      user: req.user._id,
      company: req.params.id,
    });
    if (checkFeedback) {
      return res.status(400).json({
        success: false,
        message: "You have already posted feedback for this company",
      });
    }
    const newFeedback = new FeedBack({
      user: req.user._id,
      profile,
      company,
      feedback,
    });
    const data = await newFeedback.save();
    res.status(200).json({
      success: true,
      message: "Feedback posted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

/**
 * @description To get all feedbacks for a company
 * @api /feedback/api/get-feedbacks/:id
 * @access PRIVATE
 * @type Get
 */

router.get("/api/get-feedbacks/:id", userAuth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    const feedbacks = await FeedBack.find({ company: req.params.id })
      .populate("user", "name")
      .populate("profile", "avatar");
    res.status(200).json({
      success: true,
      message: "Feedbacks fetched successfully",
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

/**
 * @description To upvote a feedback
 * @api /feedback/api/upvote/:id
 * @access PRIVATE
 * @type PUT
 * @body id
 **/

router.put("/api/upvote/", userAuth, async (req, res) => {
  try {
    let feedbackId = req.body.id;
    const feedback = await FeedBack.findById(feedbackId);
    if (!feedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback not found",
      });
    }
    // check if user has already upvoted this feedback
    let upvoted = feedback.upvotes.includes(req.user._id);
    if (upvoted) {
      return res.status(400).json({
        success: false,
        message: "You have already upvoted this feedback",
      });
    }
    feedback.upvotes.push(req.user._id);
    feedback.isupvoted = true;
    await feedback.save();
    res.status(200).json({
      success: true,
      message: "Upvoted successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
