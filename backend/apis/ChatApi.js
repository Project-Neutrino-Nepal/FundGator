const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
/**
 * @description  Create or fetch One to One Chat
 * @api /chat/api/chat
 * @access PRIVATE
 * @type POST
 * */

router.post("/api/chat", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    // Check if chat already exists
    let chatExists = await Chat.find({
      isGroupChat: false, // 'isGroupChat' will be false as it is one-to-one chat
      // logged in user's id and the user id we sent should be same in the 'users' array
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password") // Return 'users' without 'password'
      .populate("latestMessage"); // Return 'latestMessage'

    chatExists = await User.populate(chatExists, {
      path: "latestMessage.sender",
      select: "name pic email", // Fields we want to populate
    });

    // Check if chat exists, else create a new chat
    if (chatExists.length > 0) {
      return res.status(200).send(chatExists[0]);
    } else {
      let newChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(newChatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Failed to create new chat",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create new chat",
    });
  }
});

/**
 * @description  Fetch all chats for a user
 * @api /chat/api/chat
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/chat", async (req, res) => {
  try {
    let results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .exec();

    results = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).send(results);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
});

/**
 * @description  Create New Group Chat
 * @api /chat/api/group
 * @access PRIVATE
 * @type POST
 * */

router.post("/api/group", async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Please Fill all the feilds",
    });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "More than 2 users are required to form a group chat",
    });
  }

  // If current user not present in users array
  if (!users.includes(req.user._id.toString())) {
    users.push(req.user); // Add current user along with all the people
  }

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user, // As current user is creating the group
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
});

/**
 * @description  Rename Group Chat
 * @api /chat/api/rename
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/rename", async (req, res) => {
  const { chatId, chatName } = req.body;

  // Check if the requester is admin
  const isAdmin = await Chat.findOne({ groupAdmin: req.user._id }).exec();
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You are not authorized",
    });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Chat Not Found",
      });
    } else {
      return res.status(200).json(updatedChat);
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: error.message,
    });
  }
});

/**
 * @description  Add User to Group Chat
 * @api /chat/api/add-user
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/add-user", async (req, res) => {
  const { chatId, userId } = req.body;

  // Check if the requester is admin
  const isAdmin = await Chat.findOne({ groupAdmin: req.user._id }).exec();
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You are not authorized",
    });
  }

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Chat Not Found",
    });
  } else {
    return res.status(200).json(added);
  }
});

/**
 * @description  Remove User from Group Chat
 * @api /chat/api/remove-user
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/remove-user", async (req, res) => {
  const { chatId, userId } = req.body;

  // Check if the requester is admin
  const isAdmin = await Chat.findOne({ groupAdmin: req.user._id }).exec();
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You are not authorized",
    });
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Chat Not Found",
    });
  } else {
    return res.status(200).json(removed);
  }
});

module.exports = router;
