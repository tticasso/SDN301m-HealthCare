const express = require('express')
const bodyParser = require('body-parser')
const chatController = require('../controllers/ChatController')
const chatRouter = express.Router()

chatRouter.use(bodyParser.json())
chatRouter.post('/create', chatController.createChat)

module.exports = chatRouter