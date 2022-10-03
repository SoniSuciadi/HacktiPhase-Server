const mongoose = require("mongoose");

const chat = mongoose.model("Chats", {
  sender: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    require: true,
  },
});

module.exports = chat;
