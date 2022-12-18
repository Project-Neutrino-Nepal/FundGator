const express = require("express");
const router = express.Router();
const Tags = require("../../models/tagModel");
const userAuth = require("../../middlewares/auth-guard");

/**
 * @description To create Tags
 * @api /admin/api/create-tags
 * @access public
 * @type POST
 */

router.post("/api/create-tags", userAuth, async (req, res) => {
  try {
    let { body } = req;
    let tags = await Tags.findOne({ name: body.name });
    if (tags) {
      return res.status(400).json({
        success: false,
        message: "Tags already exists",
      });
    }
    tags = new Tags({
      user: req.user._id,
      ...body,
    });
    await tags.save();
    res.status(200).json({
      success: true,
      message: "Tags created successfully",
      tags,
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
 * @description To Update Tags
 * @api /admin/api/update-tags
 * @access public
 * @type PUT
 * */

router.put("/api/update-tags/:id", userAuth, async (req, res) => {
  try {
    let { body } = req;
    let tags = await Tags.findOne({ _id: req.params.id });
    if (!tags) {
      return res.status(400).json({
        success: false,
        message: "Tags not found",
      });
    }
    tags

      .set({
        user: req.user._id,
        ...body,
      })
      .save();
    res.status(200).json({
      success: true,
      message: "Tags updated successfully",
      tags,
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
 * @description To Delete Tags
 * @api /admin/api/delete-tags
 * @access Private
 * @type DELETE
 * */

router.delete("/api/delete-tags/:id", userAuth, async (req, res) => {
    try {
        let tags = await Tags.findOne({ _id: req.params.id });
        if (!tags) {
            return res.status(400).json({
                success: false,
                message: "Tags not found",
            });
        }
        await tags.remove();
        res.status(200).json({
            success: true,
            message: "Tags deleted successfully",
            tags,
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
 * @description To Get All Tags
 * @api /admin/api/get-tags
 * @access Private
 * @type GET
 * */
 router.get("/api/get-tags",userAuth,async(req,res)=>{
    try {
        let tags = await Tags.find();
        if(!tags){
            return res.status(404).json({
                success:false,
                message:"Tags not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Tags fetched successfully",
            tags
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
 })




module.exports = router;
