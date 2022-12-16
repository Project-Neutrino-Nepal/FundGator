const { model, Schema } = require("mongoose");

const PostsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("post", PostsSchema);
module.exports = Post;
