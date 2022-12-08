const express = require("express");
const userAuth = require("../middlewares/auth-guard");
const Company = require("../models/companyModel");
const Portfolio = require("../models/portfolioModel");
const router = express.Router();


/**
 * @description To Create Portfolio of the authenticated Investor
 * @api /protfolio/api/invest
 * @access PRIVATE
 * @type POST
 */

router.post("/api/invest", userAuth,async (req, res) => {
    try {
        const {body} = req;
        const portfolio = await Company.findById({invetors: req.user._id});
        if(portfolio){
            return res.status(404).json({
                success: false,
                message: "You Already Own this Company",
            });
        }
        const newPortfolio = new Portfolio({
            ...body,
            user: req.user._id,
        });
        await newPortfolio.save();
        res.status(200).json({
            success: true,
            message: "Portfolio Created Successfully",
            newPortfolio,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
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
    let portfolio = await Portfolio.findOne({ user: req.user._id });
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
