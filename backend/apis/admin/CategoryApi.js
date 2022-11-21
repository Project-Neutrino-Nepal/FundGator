const express = require("express");
const router = express.Router();
const Category = require("../../models/categoryModel");
const userAuth = require("../../middlewares/auth-guard");

/**
 * @description To Create Category
 * @api /admin/api/create-category
 * @access private
 * @type POST
 * */

router.post("/api/create-category", userAuth, async (req, res) => {
  try {
    let { body } = req;
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
    });
    await category.save();
    res.status(200).json({
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

module.exports = router;
