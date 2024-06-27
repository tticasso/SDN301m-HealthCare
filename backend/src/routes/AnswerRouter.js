const express = require('express')
const bodyParser = require('body-parser')
const AnswerController = require('../controllers/AnswerController')
const answerRouter = express.Router()

answerRouter.use(bodyParser.json())
answerRouter.post('/create', AnswerController.createAnswer),
answerRouter.get('/list', AnswerController.getAllAnswer),
answerRouter.get('/:id', AnswerController.getAnswerById),
answerRouter.put('/edit/:id', AnswerController.editAnswer),
answerRouter.delete('/delete/:id', AnswerController.deleteAnswer),

module.exports = answerRouter