const express = require("express");
const userAuth = require("../middlewares/auth-guard");
const { uploadPostsImage } = require("../middlewares/uploader");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const router = express.Router();
const DOMAIN = "http://127.0.0.1:5000/";

/**
 * @description To Create Posts
 * @api /posts/api/create-post
 * @access PRIVATE
 * @type POST
 */

router.post(
  "/api/create-post",
  userAuth,
  uploadPostsImage.fields([
    { name: "img", maxCount: 1 },
    { name: "vid", maxCount: 1 },
  ]),

  async (req, res) => {
    const { body } = req;
    let image = "";
    let video = "";
    let imagePath,
      vidPath = "";
    if (req.files) {
      if (req.files.img == undefined) {
        return res.status(400).json({
          success: false,
          message: "Please select an image",
        });
      }
      if (req.files.img == null) {
        imagePath = "";
      }
      if (req.files.img) {
        image = req.files.img[0];
        imagePath = DOMAIN + "uploads/posts-images/" + image.filename;
      }

      if (req.files.vid == undefined) {
        return res.status(400).json({
          success: false,
          message: "Please select a video",
        });
      }
      if (req.files.vid == null) {
        vidPath = "";
      }
      if (req.files.vid) {
        video = req.files.vid[0];
        vidPath = DOMAIN + "uploads/posts-images/" + video.filename;
      }
    }

    try {
      let postUser = await User.findById(req.user._id);
      let postProfile = await Profile.findOne({ user: req.user._id });

      let post = new Post({
        user: postUser,
        profile: postProfile,
        image: imagePath,
        video: vidPath,
        text: body.description,
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post created successfully",
        post,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
);

/**
 * @description To Get All Posts
 * @api /posts/api/get-all-posts
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-all-posts", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    let profile = await Profile.findOne({ user: req.user._id });

    let posts = await Post.find()
      .populate("profile")
      .populate("comments.profile")
      .sort({ date: -1 });
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

/**
 * @description To Like Post
 * @api /posts/api/like-post/:id
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/like-post/:id", userAuth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } });
      return res.status(200).json({
        success: true,
        message: "Post liked successfully",
        post,
      });
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } });
      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        post,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To comment on post
 * @api /posts/api/comment-post/:id
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/comment-post/:id", userAuth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    let profile = await Profile.findOne({ user: req.user._id });
    post.comments.push({
      user: req.user._id,
      profile: profile._id,
      text: req.body.text,
    });
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
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

module.exports = router;
