const express = require('express')
const bodyParser = require('body-parser')
const ConversationController = require('../controllers/ConversationController')
const conversationRouter = express.Router()

conversationRouter.use(bodyParser.json())
conversationRouter.post("/list", ConversationController.getConversationByUserid);
conversationRouter.get("/:id", ConversationController.getConversationById);
conversationRouter.post("/create", ConversationController.createConversation);
conversationRouter.put("/", ConversationController.updateConversation);
conversationRouter.delete("/", ConversationController.deleteConversation);

module.exports = conversationRouter