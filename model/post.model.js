const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
