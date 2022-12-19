const express = require("express");
const { model } = require("mongoose");
const userAuth = require("../middlewares/auth-guard");
const Chat = require("../models/chatModel");
const router = new express.Router();
const Message = require("../models/messageModel");

/**
 * @description To Create Message
 * @api /message/api/create
 * @access PRIVATE
 * @type POST
 */

router.post("/api/create", userAuth, async (req, res) => {
  try {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    // Create a new message
    let message = await Message.create({
      sender: req.user._id, // Logged in user id,
      content,
      chat: chatId,
    });
    message = await (
      await message.populate({
        path: "sender",
        select: "name",
        model: "user",
      })
    ).populate({
      path: "chat",
      select: "chatName isGroupChat users",
      model: "chat",
      populate: {
        path: "users",
        select: "name email",
        model: "user",
      },
    });

    // Update latest message
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(201).json(message); // Send message we just created now
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create New Message",
    });
  }
});

/**
 * @description To Get All Messages
 * @api /message/api/getAll
 * @access PRIVATE
 * @type GET
 *  */

router.get("/api/getAll/:chatId", userAuth, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate({
        path: "chat",
        select: "chatName isGroupChat users",
        model: "chat",
        populate: {
          path: "users",
          select: "name email",
          model: "user",
        },
      });

    res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to fetch all Messages",
    });
  }
});

module.exports = router;