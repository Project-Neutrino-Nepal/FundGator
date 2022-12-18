const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Company = require("../models/companyModel");
const Reason = require("../models/reasonModel");
const Category = require("../models/categoryModel");
const Tags = require("../models/tagModel");
const uploadCompanyImage =
  require("../middlewares/uploader").uploadCompanyImage;
const DOMAIN = "http://127.0.0.1:5000/";

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
    // the categorry name is converted to category id and passed to the reason model
    let category = await Category.findOne({ name: body.category });
    let categoryID = category._id;
    // tagID array created,
    //  for loop to iterate through the tag array
    //  tag name is converted to tag id and pushed to tagID array
    let tagID = [];
    for (let i = 0; i < body.tag.length; i++) {
      let tag = await Tags.findOne({ name: body.tag[i] });
      tagID.push(tag._id);
    }

    console.log(tagID);
    console.log(categoryID);
    const company = await Company.findOne({ name: req.params.name });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const companyID = company._id;
    const reasons = await Reason.findOne({ company: companyID });
    if (reasons) {
      return res.status(400).json({
        success: false,
        message: "Reasons already exists",
      });
    }
    const reason = await Reason.create({
      ...body,
      company: companyID,
      category: categoryID,
      tag: tagID,
    });
    res.status(200).json({
      success: true,
      message: "Reason created successfully",
      reason,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
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
    const reasons = await Reason.findOne({ company: companyID });
    if (!reasons) {
      return res.status(400).json({
        success: false,
        message: "Reasons not found",
      });
    }
    let file = req.file;
    console.log(file);
    if (file === undefined || file === null) {
      filename = DOMAIN + "uploads/assets/" + "default_company.svg";
    } else {
      filename = DOMAIN + "uploads/company-images/" + file.filename;
    }
    const reason = await Reason.findOneAndUpdate(
      { company: companyID },
      {
        $set: body,
        // teams: { image: filename }
      },

      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Reason updated successfully",
      reason,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
      message: "Internal server error",
    });
  }
});

// route to update team member image for a company having nested data
router.put(
  "/api/update-teamimage/:name",
  uploadCompanyImage.array("image", 10),
  async (req, res) => {
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
      if (!reasons) {
        return res.status(400).json({
          success: false,
          message: "Reasons not found",
        });
      }
      let file = req.file;
      console.log(file);
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_company.svg";
      } else {
        filename = DOMAIN + "uploads/company-images/" + file.filename;
      }
      const reason = await Reason.findOneAndUpdate(
        { company: companyID },

        // { ...body},
        { teams: { image: filename } },

        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "team image updated successfully",
        reason,
      });
    } catch (error) {
      res.status(500).json({
        error,
        success: false,
        message: "Internal server error",
      });
    }
  }
);

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

router.get("/api/get-reason/:id", async (req, res) => {
  try {
    const company = await Company.findOne({ name: req.params.id });
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
