const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Company = require("../models/companyModel");
const Reason = require("../models/reasonModel");
/**
 * @description To input list of top resason,city name and differnet link like
 * company websites,facebook,tkinter  to invest in a company
 * @api /reason/api/create-reason
 * @access PRIVATE
 * @type POST
 */
router.post("/api/create-reason/:name", userAuth, async (req, res) => {
  try {
    const { body } = req;

    const company = await Company.findOne({ name: req.params.name });
    const companyID = company._id;

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const reasons = await Reason.findOne({ company: companyID });
    if (reasons) {
      return res.status(400).json({
        success: false,
        message: "Reasons already added",
      });
    }
    const reason = new Reason({
      company: companyID,
      ...body,
    });
    await reason.save();
    res.status(201).json({
      success: true,
      message: "Reason created successfully",
      reason,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});



/**
 * @description To update reason for adding team information
 * @api /reason/api/update-reason/:name
 * @access PRIVATE
 * @type POST
 */
router.put("/api/update-reason/:name", userAuth, async (req, res) => {
  try {
    const { body } = req;
    const company = await Company.findOne({ name: req.params.name });
    const companyID = company._id;
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const reasons = await Reason.findOne
    ({ company: companyID });
    if (!reasons) {
      return res.status(400).json({
        success: false,
        message: "Reasons not found",
      });
    }
    const reason = await Reason.findOneAndUpdate(
      { company: companyID },
      { ...body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Reason updated successfully",
      reason,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});





//route to get reasons for a company
router.get("/api/get-reasons/:id", async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const reasons = await Reason.findOne({ company: company._id });
    if (!reasons) {
      return res.status(404).json({
        success: false,
        message: "Reasons not found",
      });
    }
    res.status(200).json({
      reasons,
      success: true,
      message: "Reasons found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//route to get all reasons by company

// router.get("/api/get-all-reasons-by-company", async (req, res) => {
//     try {
//         const { name } = req.query;
//         const company = await Company.findOne({
//             name
//         });

//         const companyID = company._id;
//         const reasons = await Reason.find({ company: companyID });
//         res.status(200).json({
//             success: true,
//             message: "Reasons fetched successfully",
//             reasons,
//         });
//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// });

module.exports = router;
