const express = require("express");
const userAuth = require("../middlewares/auth-guard");
const Post = require("../models/postModel");
const router = express.Router();

/**
 * @description To Create Posts
 * @api /posts/api/create-post
 * @access PRIVATE
 * @type POST
 */

router.post("/api/create-post", userAuth, async (req, res) => {
  const { body } = req;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  let newPost = new Post({
    user: req.user.id,
    text: body.text,
    image: body.image,
    video: body.video,
    file: body.file,
  });
  let post = await newPost.save();
  return res.status(200).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

/**
 * @description To Get All Posts
 * @api /posts/api/get-all-posts
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-all-posts", userAuth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
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
 * @description To Get Post By name
 * @api /posts/api/get-post-by-name/:name
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-post-by-name/:name", userAuth, async (req, res) => {
  try {
    let post = await Post.findOne({ name: req.params.name });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
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
 * @description To Get Post of authenticted user
 * @api /posts/api/get-post-of-auth-user
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-post-of-auth-user", userAuth, async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
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
 * @description To search post by name
 * @api /posts/api/search-post-by-name/:name
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/search-post-by-name/:name", userAuth, async (req, res) => {
  try {
    let posts = await Post.find({ name: { $regex: req.params.name } });
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
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