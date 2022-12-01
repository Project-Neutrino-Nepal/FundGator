const express = require("express");
const router = express.Router();
const Company = require("../models/companyModel");
const userAuth = require("../middlewares/auth-guard");
const { find } = require("../models/companyModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const uploadCompanyVideo =
  require("../middlewares/uploader").uploadCompanyVideo;
const uploadCompanyImage =
  require("../middlewares/uploader").uploadCompanyImage;
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To create Company by authenticated user
 * @api /company/api/create-company
 * @access PRIVATE
 * @type POST
 */

router.post(
  "/api/create-company",
  userAuth,
  uploadCompanyImage.single("image"),

  async (req, res) => {
    try {
      let { body } = req;
      let company = await Company.findOne({ name: body.name });
      if (company) {
        return res.status(400).json({
          success: false,
          message: "Company already exists",
        });
      }
      let file = req.file;
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_company.svg";
      } else {
        filename = DOMAIN + "uploads/company-images/" + file.filename;
      }
      const userProfile = await Profile.findOne({ user: req.user._id });
      company = new Company({
        user: req.user._id,
        profile: userProfile,
        ...body,
        image: filename,
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
  }
);



/**
 * @description To upload company video
 * @api /company/api/upload-video
 * @access PRIVATE
 * @type PUT
 * */

router.put(
  "/api/upload-video",
  userAuth,
  uploadCompanyVideo.single("company_video"),
  async (req, res) => {
    try {
      let { body } = req;
      let file = req.file;
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename = DOMAIN + "uploads/company-videos/" + file.filename;
      }
      const company = await Company.updateOne(
        { user: req.user._id },
        {
          company_video: filename,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Video uploaded successfully",
        company,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

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
    let companies = await Company.find({ user: req.user._id })
      .populate("category")
      .populate("profile")
      .exec();
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
 * @description To get all verified Companies and their owners
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
    let company = await Company.find({ verified: true })
      .populate("user")
      .populate("category")
      .populate("profile")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
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

/**
 * @description To get all Companies and their owners
 * @api /company/api/companies
 * @access Public
 * @type GET
 */

router.get("/api/all-companies", async (req, res) => {
  try {
    let companies = await Company.find();

    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
    let company = await Company.find()

      .populate("user")
      .populate("category")
      .populate("profile")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
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

/**
 * @description To get number of Companies
 * @api /company/api/get-no-companies
 * @access Private
 * @type GET
 * */

router.get("/api/get-no-companies", userAuth, async (req, res) => {
  try {
    let companies = await Company.find({ user: req.user._id });
    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
    const noCompanies = await Company.countDocuments();
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
      noCompanies,
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
 * @description To get company by id
 * @api /company/api/company/:id
 * @access Private
 * @type GET
 * */

router.get("/api/company/:id", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
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
