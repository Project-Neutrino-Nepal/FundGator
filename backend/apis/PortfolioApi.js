const express = require("express");
const userAuth = require("../middlewares/auth-guard");
const Company = require("../models/companyModel");
const Portfolio = require("../models/portfolioModel");
const Profile = require("../models/profileModel");
const router = express.Router();

/**
 * @description To Create Portfolio of the authenticated Investor
 * @api /protfolio/api/invest
 * @access PRIVATE
 * @type POST
 */

router.post("/api/create-portfolio", userAuth, async (req, res) => {
  try {
    const id = req.body.id;
    const amount = req.body.amount;
    const company = await Company.findOne({ _id: id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found.",
      });
    }
    if (company.verified == false) {
      return res.status(400).json({
        success: false,
        message: "Company is not verified.",
      });
    }
    if (company.user == req.user._id) {
      return res.status(400).json({
        success: false,
        message: "You cannot invest in your own company.",
      });
    }
    if (company.investors.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You have already invested in this company.",
      });
    }

    company.investors.push(req.user._id);
    let newAmount = company.fund_raised + amount;
    company.fund_raised = newAmount;
    await company.save();

    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found.",
      });
    }

    let portfolio = new Portfolio({
      user: req.user._id,
      company: id,
      amount: amount,
      profile: profile,
    });
    await portfolio.save();
    return res.status(200).json({
      success: true,
      message: "Portfolio created successfully.",
      // portfolio,
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
 * @description To Get Portfolio of the authenticated Investor
 * @api /protfolio/api/my-portfolio
 * @access PRIVATE
 * @type GET
 */

router.get("/api/my-portfolio", userAuth, async (req, res) => {
  try {
    let portfolio = await Portfolio.find({ user: req.user._id });
    if (!portfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Portfolio fetched successfully.",
      portfolio,
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
 * @description To Update Portfolio of the authenticated Investor
 * @api /protfolio/api/update-portfolio
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/update-portfolio", userAuth, async (req, res) => {
  try {
    const id = req.body.id;
    const amount = req.body.amount;
    const company = await Company.findOne({ _id: id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found.",
      });
    }
    if (company.verified == false) {
      return res.status(400).json({
        success: false,
        message: "Company is not verified.",
      });
    }
    if (company.user == req.user._id) {
      return res.status(400).json({
        success: false,
        message: "You cannot invest in your own company.",
      });
    }
    if (company.investors.includes(req.user._id) == false) {
      return res.status(400).json({
        success: false,
        message: "You have not invested in this company.",
      });
    }

    let portfolio = await Portfolio.findOne({
      user: req.user._id,
      company: id,
    });
    if (!portfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio not found.",
      });
    }
    let newAmount = company.fund_raised + amount;
    company.fund_raised = newAmount;
    await company.save();

    portfolio.amount = portfolio.amount + amount;
    await portfolio.save();
    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully.",
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
