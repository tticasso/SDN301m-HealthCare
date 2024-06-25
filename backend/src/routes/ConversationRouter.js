const express = require('express')
const bodyParser = require('body-parser')
const conversationController = require('../controllers/ConversationController')
const conversationRouter = express.Router()

conversationRouter.use(bodyParser.json())
conversationRouter.post('/create', conversationController.createConversation)

module.exports = conversationRouter