const express = require('express')
const bodyParser = require('body-parser')
const ChatController = require('../controllers/ChatController')
const chatRouter = express.Router()

chatRouter.use(bodyParser.json())
chatRouter.post('/list', ChatController.getChatByConversationId)
chatRouter.get("/:id", ChatController.getChatById);
chatRouter.post("/create", ChatController.createChat);
chatRouter.put("/", ChatController.updateChat);
chatRouter.delete("/", ChatController.deleteChat);

module.exports = chatRouter