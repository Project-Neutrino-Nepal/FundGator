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
