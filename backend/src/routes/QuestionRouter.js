const express = require('express')
const bodyParser = require('body-parser')
const QuestionController = require('../controllers/QuestionController')
const questionRouter = express.Router()

questionRouter.use(bodyParser.json())
questionRouter.post('/create', QuestionController.createQuestion),
questionRouter.get('/list', QuestionController.getAllQuestion),
questionRouter.get('/:id', QuestionController.getQuestionById),
questionRouter.put('/edit/:id', QuestionController.editQuestion),
questionRouter.delete('/delete/:id', QuestionController.deleteQuestion),

module.exports = questionRouter