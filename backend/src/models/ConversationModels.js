const mongoose = require("mongoose");
// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  name: String,
  participants: {
    type: [String],
    ref: "User",
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Conversation model
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
