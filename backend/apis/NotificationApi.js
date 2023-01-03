 const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth-guard");
const Notification = require("../models/notificationModel").Notification;

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