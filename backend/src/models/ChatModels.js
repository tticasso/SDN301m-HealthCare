const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  file: String,
  to: {
    type: String,
    required: true,
    ref: "User",
  },
  sendBy: {
    type: String,
    required: true,
    ref: "User",
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;