const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Notification = require("../models/notificationModel").Notification;
const VerifyNotification =
  require("../models/notificationModel").VerifyNotification;

/**
 * @description To post VerifyNotification
 * @api /notification/api/verify-notification
 * @access private
 * @type POST
 * */

router.post("/api/verify-notification", async (req, res) => {
  try {
    const { body } = req;

    let verifynotification = new VerifyNotification({ ...body });
    // Save notification to database
    verifynotification.save((error) => {
      if (error) throw error;
      console.log("Notification saved to database");
    });
    res.status(200).json({
      success: true,
      message: "Notification saved to database",
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
 * @description To post VerifyNotification and update viwed to true when user click on notification bar
 * @api /notification/api/update-verifynotification
 * @access private
 * @type put
 * */
 
router.put("/api/update-verifynotification",userAuth, async (req, res) => {
  try {
    let user_id=req.user._id

    let verifynotification = await VerifyNotification.find(
    );
    verifynotification.map((item) => {
      if (item._id) {
        item.readBy.push(user_id);
        item.save();
      }
    });

    if (!verifynotification) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification found",
      verifynotification,
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
 * @description To get VeryfyNotification where user is not in readBy array
 * @api /notification/api/get-unread-verifynotification
 * @access private
 * @type GET
 * */

router.get("/api/get-unread-verifynotification",userAuth, async (req, res) => {
  try {
    let user_id=req.user._id
    let verifynotification = await VerifyNotification.find(
      {readBy:{$nin:[user_id]}}
    );
    if (!verifynotification) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification found",
      verifynotification,
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
 * @description To get VerifyNotification
 * @api /notification/api/get-verifynotification
 * @access private
 * @type GET
 * */

router.get("/api/get-verifynotification", async (req, res) => {
  try {
    let verifynotification = await VerifyNotification.find()
      .populate("company")
      .exec();
    if (!verifynotification) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification found",
      verifynotification,
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
 *  @description To get Notification
 * @api /notification/api/get-notification
 * @access private
 * @type GET
 * */

router.get("/api/get-notification", async (req, res) => {
  try {
    let notification = await Notification.find().populate("company").exec();
    if (!notification) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification found",
      notification,
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
