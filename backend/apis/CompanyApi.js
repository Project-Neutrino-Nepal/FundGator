const express = require("express");
const router = express.Router();
const Company = require("../models/companyModel");
const userAuth = require("../middlewares/auth-guard");
const { find } = require("../models/companyModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Portfolio = require("../models/portfolioModel");
const Reason = require("../models/reasonModel");
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
 * @description To upload company video by company owner using company name as params
 * @api /company/api/upload-video/:name
 * @access PRIVATE
 * @type PUT
 * */

router.put(
  "/api/upload-video/:name",
  userAuth,
  uploadCompanyVideo.single("company_video"),
  async (req, res) => {
    try {
      let { name } = req.params;
      let { file } = req;
      console.log(file);
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename = DOMAIN + "uploads/company-videos/" + file.filename;
      }
      let company = await Company.findOne({ name: name, user: req.user._id });
      if (!company) {
        return res.status(400).json({
          success: false,
          message: "Company not found",
        });
      }
      company = await Company.findOneAndUpdate(
        { name: name, user: req.user._id },
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
 * @description To update company to add document of the company using company name as params
 * @api /company/api/multipleimages/:name
 * @access PRIVATE
 * @type PUT
 * */
router.put(
  "/api/multipleimages/:name",
  userAuth,
  uploadCompanyImage.fields([
    { name: "registration_card", maxCount: 1 },
    { name: "pan_card", maxCount: 1 },
    { name: "citizenship_front", maxCount: 1 },
    { name: "citizenship_back", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let { name } = req.params;
      let { body } = req;
      let registration_card = body.registration_card;
      let pan_card = body.pan_card;
      let citizenship_front = body.citizenship_front;
      let citizenship_back = body.citizenship_back;
      let content = body.content;
      console.log(
        registration_card,
        pan_card,
        citizenship_front,
        citizenship_back,
        content
      );
      let file = req.files.registration_card[0];
      let file1 = req.files.pan_card[0];
      let file2 = req.files.citizenship_front[0];
      let file3 = req.files.citizenship_back[0];

      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename = DOMAIN + "uploads/company-images/" + file.filename;
      }
      if (file1 === undefined || file1 === null) {
        filename1 = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
      }
      if (file2 === undefined || file2 === null) {
        filename2 = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename2 = DOMAIN + "uploads/company-images/" + file2.filename;
      }
      if (file3 === undefined || file3 === null) {
        filename3 = DOMAIN + "uploads/assets/" + "default_companyVideo.mp4";
      } else {
        filename3 = DOMAIN + "uploads/company-images/" + file3.filename;
      }

      let company = await Company.findOne({ name: name, user: req.user._id });
      if (!company) {
        return res.status(400).json({
          success: false,
          message: "Company not found",
        });
      }

      company = await Company.findOneAndUpdate(
        { name: name, user: req.user._id },
        {
          registration_card: filename,
          pan_card: filename1,
          citizenship_front: filename2,
          citizenship_back: filename3,

          $set: body,
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
 * @description To update add document pages in company
 * @api /company/api/update-document/:name
 * @access PRIVATE
 * @type PUT
 * */
router.put(
  "/api/update-document/:name",
  userAuth,
  uploadCompanyImage.fields([
    { name: "registration_card", maxCount: 1 },
    { name: "pan_card", maxCount: 1 },
    { name: "citizenship_front", maxCount: 1 },
    { name: "citizenship_back", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let { name } = req.params;
      let { body } = req;
      console.log(req.files.registration_card);

      let company = await Company.findOne({ name: name, user: req.user._id });
      if (!company) {
        return res.status(400).json({
          success: false,
          message: "Company not found",
        });
      }

      filesLength = JSON.stringify(req.files).length;

      if (filesLength === 2) {
        company = await Company.findOneAndUpdate(
          { name: name, user: req.user._id },
          {
            content: body.content,
          },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "page updated successfully",
          company,
        });
      } else {
        if (req.files.registration_card) {
          let file = req.files.registration_card[0];
          filename = DOMAIN + "uploads/company-images/" + file.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.pan_card) {
          let file = req.files.pan_card[0];
          filename = DOMAIN + "uploads/company-images/" + file.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              pan_card: filename,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.citizenship_front) {
          let file = req.files.citizenship_front[0];
          filename = DOMAIN + "uploads/company-images/" + file.filename;
          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              citizenship_front: filename,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.citizenship_back) {
          let file = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              citizenship_back: filename,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.registration_card && req.files.pan_card) {
          let file = req.files.registration_card[0];
          let file1 = req.files.pan_card[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              pan_card: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.registration_card && req.files.citizenship_front) {
          let file = req.files.registration_card[0];
          let file1 = req.files.citizenship_front[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              citizenship_front: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.registration_card && req.files.citizenship_back) {
          let file = req.files.registration_card[0];
          let file1 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              citizenship_back: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.pan_card && req.files.citizenship_front) {
          let file = req.files.pan_card[0];
          let file1 = req.files.citizenship_front[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              pan_card: filename,
              citizenship_front: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.pan_card && req.files.citizenship_back) {
          let file = req.files.pan_card[0];
          let file1 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              pan_card: filename,
              citizenship_back: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (req.files.citizenship_front && req.files.citizenship_back) {
          let file = req.files.citizenship_front[0];
          let file1 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              citizenship_front: filename,
              citizenship_back: filename1,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (
          req.files.registration_card &&
          req.files.pan_card &&
          req.files.citizenship_front
        ) {
          let file = req.files.registration_card[0];
          let file1 = req.files.pan_card[0];
          let file2 = req.files.citizenship_front[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
          filename2 = DOMAIN + "uploads/company-images/" + file2.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              pan_card: filename1,
              citizenship_front: filename2,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (
          req.files.registration_card &&
          req.files.pan_card &&
          req.files.citizenship_back
        ) {
          let file = req.files.registration_card[0];
          let file1 = req.files.pan_card[0];
          let file2 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
          filename2 = DOMAIN + "uploads/company-images/" + file2.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              pan_card: filename1,
              citizenship_back: filename2,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (
          req.files.registration_card &&
          req.files.citizenship_front &&
          req.files.citizenship_back
        ) {
          let file = req.files.registration_card[0];
          let file1 = req.files.citizenship_front[0];
          let file2 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
          filename2 = DOMAIN + "uploads/company-images/" + file2.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              citizenship_front: filename1,
              citizenship_back: filename2,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else if (
          req.files.pan_card &&
          req.files.citizenship_front &&
          req.files.citizenship_back
        ) {
          let file = req.files.pan_card[0];
          let file1 = req.files.citizenship_front[0];
          let file2 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
          filename2 = DOMAIN + "uploads/company-images/" + file2.filename;

          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              pan_card: filename,
              citizenship_front: filename1,
              citizenship_back: filename2,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        } else {
          let file = req.files.registration_card[0];
          let file1 = req.files.pan_card[0];
          let file2 = req.files.citizenship_front[0];
          let file3 = req.files.citizenship_back[0];

          filename = DOMAIN + "uploads/company-images/" + file.filename;
          filename1 = DOMAIN + "uploads/company-images/" + file1.filename;
          filename2 = DOMAIN + "uploads/company-images/" + file2.filename;
          filename3 = DOMAIN + "uploads/company-images/" + file3.filename;
          company = await Company.findOneAndUpdate(
            { name: name, user: req.user._id },
            {
              registration_card: filename,
              pan_card: filename1,
              citizenship_front: filename2,
              citizenship_back: filename3,
              content: body.content,
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
          });
        }
      }
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
 * @description To update Company content by company name
 * @api /company/api/update-companycontent/:id
 * @access PRIVATE
 * @type PUT
 */

// router.put("/api/update-companycontent/:id", userAuth, async (req, res) => {
//   try {
//     let { body } = req;
//     let company = await Company.findOne({ name: req.params.id });
//     if (!company) {
//       return res.status(400).json({
//         success: false,
//         message: "Company not found",
//       });
//     }
//     company = await Company.findOneAndUpdate(
//       { name: req.params.id },
//       { ...body },
//       { new: true }
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Company Updated Successfully",
//       company,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred.",
//     });
//   }
// });

/**
 * @description To update Company image with company name by the company owner
 * @api /company/api/update-companyimage/:name
 * @access PRIVATE
 * @type PUT
 */

router.put(
  "/api/upload-companyimage/:name",
  userAuth,
  uploadCompanyImage.single("image"),
  async (req, res) => {
    try {
      let { name } = req.params;
      let { file } = req;
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_company.svg";
      } else {
        filename = DOMAIN + "uploads/company-images/" + file.filename;
      }
      let company = await Company.findOne({ name: name, user: req.user._id });
      if (!company) {
        return res.status(400).json({
          success: false,
          message: "Company not found",
        });
      }
      company = await Company.findOneAndUpdate(
        { name: name, user: req.user._id },

        {
          image: filename,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "image upload successfully",
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
    await company.deleteOne();
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
 * @description To get  company by company name
 * @api /company/api/get-company/:name
 * @access PRIVATE
 * @type GET
 */

router.get("/api/get-company/:name", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ name: req.params.name });

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
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
 * @description To get company details by id
 * @api /company/api/company/:id
 * @access Private
 * @type GET
 * */

router.get("/api/company/:id", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id })
      .populate("user")
      .exec();
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

/**
 * @description To verify company by id
 * @api /company/api/verify-company/:id
 * @access Private
 * @type PUT
 * */

router.put("/api/verify-company/:id", async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    let updatedCompany = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { verified: true },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company Verified Successfully",
      updatedCompany,
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
 * @description To reject company by id
 * @api /company/api/reject-company/:id
 * @access Private
 * @type PUT
 * */

router.put("/api/reject-company/:id", async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    let updatedCompany = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { verified: false },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company Rejected Successfully",
      updatedCompany,
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
 * @description To Get all investors of a company
 * @api /events/api/get-investors/:id
 * @access Public
 * @type GET
 */

router.get("/api/get-investors/:id", async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    let investors = await Portfolio.find({ company: req.params.id })
      .populate("profile")
      .exec();
    if (!investors) {
      return res.status(400).json({
        success: false,
        message: "No Investors Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Investors Retrieved Successfully",
      investors,
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
 * @description To put company in watchlist
 * @api /company/api/watchlist/:id
 * @access Private
 * @type PUT
 **/

router.put("/api/watchlist/:id", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    let watchlist = company.watchlist.includes(req.user._id);
    if (watchlist) {
      return res.status(400).json({
        success: false,
        message: "Company already in watchlist",
      });
    }

    let updatedCompany = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { watchlist: req.user._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company Added to Watchlist Successfully",
      updatedCompany,
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
 * @description To remove company from watchlist
 * @api /events/api/watchlist/:id
 * @access Private
 * @type PUT
 * */

router.put("/api/remove-watchlist/:id", userAuth, async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }
    let watchlist = await Company.findOne({ watchlist: req.user._id });
    if (!watchlist) {
      return res.status(400).json({
        success: false,
        message: "Company not in watchlist",
      });
    }
    let updatedCompany = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { watchlist: req.user._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Company Removed from Watchlist Successfully",
      updatedCompany,
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
 * @description To get all companies in watchlist
 * @api /events/api/watchlist
 * @access Private
 * @type GET
 * */

router.get("/api/get-watchlist", userAuth, async (req, res) => {
  try {
    let watchlist = await Company.find({ watchlist: req.user._id });
    if (!watchlist) {
      return res.status(400).json({
        success: false,
        message: "No Companies in Watchlist",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
      watchlist,
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
 * @description To get sum of all funds invested in a company
 * @api /company/api/get-fund/
 * @access Private
 * @type GET
 */

router.get("/api/get-fund/", userAuth, async (req, res) => {
  try {
    let portfolios = await Portfolio.find({ user: req.user._id })
      .select("amount date")
      .populate("company");

    if (!portfolios) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Companies Retrieved Successfully",
      portfolios,
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
 * @description To get sum of all fund invested in a company
 * @api /company/api/get-fund-by-company
 * @access Private
 * @type GET
 */

router.get("/api/get-fund-by-company", userAuth, async (req, res) => {
  try {
    // group by company with sum of amount and sort by name of company
    let portfolios = await Portfolio.aggregate([
      {
        $group: {
          _id: "$company",
          amount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $sort: { "company.name": 1 },
      },
    ]);
    if (!portfolios) {
      return res.status(400).json({
        success: false,
        message: "No Companies Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Portfolios Retrieved Successfully",
      portfolios,
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
