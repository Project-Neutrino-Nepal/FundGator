const express = require("express");
const router = express.Router();
const Company = require("../models/companyModel");
const userAuth = require("../middlewares/auth-guard");

/**
 * @description To create Company by authenticated user
 * @api /company/api/create-company
 * @access PRIVATE
 * @type POST
 */
router.post("/api/create-company", userAuth, async (req, res) => {
  try {
    let {body} = req;
    let company = await Company.findOne({ name:body.name });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }
    company = new Company({
      user: req.user._id,
      ...body,
    });
    await company.save();
    res.status(200).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * @description To update Company
 * @api /company/api/update-company
 * @access PRIVATE
 * @type PUT
 */

router.put("/api/update-company/:id", userAuth, async (req, res) => {
  try {
    let { body } = req;
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company Updated Successfully",
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
 * @description To delete Company
 * @api /company/api/delete-company
 * @access PRIVATE
 * @type DELETE
 */

router.delete("/api/delete-company/:id", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    await company.remove();
    return res.status(200).json({
      success: true,
      message: "Company Deleted Successfully",
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
 * @description To retrieve all Companies of authenticated user
 * @api /company/api/create-company
 * @access PRIVATE
 * @type GET
 */

router.get("/api/get-my-companies", userAuth, async (req, res) => {
  try {
    let companies = await Company.find({ user: req.user._id });
    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
   
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
      companies,
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
 * @description To get all Companies
 * @api /company/api/companies
 * @access Public
 * @type GET
 */

router.get("/api/companies", async (req, res) => {
  try {
    let companies = await Company.find();
    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
     if (companies.verified != true) {
       return res.status(400).json({
         success: false,
         message: "Company not verified",
       });
     }
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
      companies,
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
 * @description To search Company
 * @api /company/api/search-company
 * @access public
 * @type post
 */

router.post("/api/search-company", async (req, res) => {
  try {
    let { body } = req;
    let company = await Company.findOne({ name: body.name });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
     if (companies.verified != true) {
       return res.status(400).json({
         success: false,
         message: "Company not verified",
       });
     }
    return res.status(200).json({
      success: true,

      message: "Company Retrieved Successfully",
      company,
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
