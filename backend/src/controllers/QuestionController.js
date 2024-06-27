const QuestionService = require("../services/QuestionService");

async function createQuestion(req, res, next) {
    try {
        const { title, body, status } = req.body;
        const newDoc = await QuestionService.createQuestion({ title, body, status });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}

async function getAllQuestion(req, res, next) {
    try {
        const question = await QuestionService.getAllQuestion();
        res.json(question);
    } catch (error) {
        next(error);
    }
}

async function editQuestion(req, res, next) {
    try {
        if (req.params.id) {
            const updatedQuestion = await QuestionService.editQuestion(req.params.id, req.body);
            res.status(200).json(updatedQuestion);
        }
    } catch (error) {
        next(error);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        if (req.params.id) {
            await QuestionService.deleteQuestion(req.params.id);
            res.status(200).json({
                "message": `Delete Question with id: ${req.params.id} successful`
            });
        }
    } catch (error) {
        next(error);
    }
}

async function getQuestionById(req, res, next) {
    try {
        if (req.params.id) {
            const question = await QuestionService.getQuestionById(req.params.id);
            res.json(question);
        }
    } catch (error) {
        next(error);
    }
}

const QuestionController = {
    createQuestion,
    getAllQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionById
}

module.exports = QuestionController