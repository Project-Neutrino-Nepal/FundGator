const express = require("express");
const router = express.Router();
const Category = require("../../models/categoryModel");
const userAuth = require("../../middlewares/auth-guard");
const User = require("../../models/userModel");
const uploadCategoryImage =
  require("../../middlewares/uploader").uploadCategoryImage;

const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To Create Category
 * @api /admin/api/create-category
 * @access private
 * @type POST
 * */

router.post("/api/create-category", userAuth,uploadCategoryImage.single("image"), async (req, res) => {
  try {
    let { body } = req;

    let file = req.file;
    console.log(file);
      if (file === undefined || file === null) {
        filename = DOMAIN + "uploads/assets/" + "default_company.svg";
      } else {
        filename = DOMAIN + "uploads/category-images/" + file.filename;
      }
     

    let user = await User.findOne({ _id: req.user._id });
    if (!user.admin) {
      return res.status(400).json({
        success: false,
        message: "You are not an admin",
      });
    }
    let category = await Category.findOne({ name: body.name });
    if (category) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
    category = new Category({
      user: req.user._id,
      ...body,
      image: filename,
    });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
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
 * @description To Update Category
 * @api /admin/api/update-category
 * @access private
 * @type PUT
 * */

router.put("/api/update-category/:id", userAuth, async (req, res) => {
  try {
    let { body } = req;
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
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
 * @description To Delete Category
 * @api /admin/api/delete-category
 * @access private
 * @type DELETE
 * */

router.delete("/api/delete-category/:id", userAuth, async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
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
 * @description To Get All Categories
 * @api /admin/api/get-all-categories
 * @access private
 * @type GET
 * */

router.get("/api/get-all-categories", userAuth, async (req, res) => {
  try {
    let categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
