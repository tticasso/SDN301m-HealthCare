const AnswerService = require("../services/AnswerService");

async function createAnswer(req, res, next) {
    try {
        const { body } = req.body;
        const newDoc = await AnswerService.createAnswer({ body });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}

async function getAllAnswer(req, res, next) {
    try {
        const answers = await AnswerService.getAllAnswer();
        res.json(answers);
    } catch (error) {
        next(error);
    }
}

async function editAnswer(req, res, next) {
    try {
        if (req.params.id) {
            const updatedAnswer = await AnswerService.editAnswer(req.params.id, req.body);
            res.status(200).json(updatedAnswer);
        }
    } catch (error) {
        next(error);
    }
}

async function deleteAnswer(req, res, next) {
    try {
        if (req.params.id) {
            await AnswerService.deleteAnswer(req.params.id);
            res.status(200).json({
                "message": `Delete Answer with id: ${req.params.id} successful`
            });
        }
    } catch (error) {
        next(error);
    }
}

async function getAnswerById(req, res, next) {
    try {
        if (req.params.id) {
            const answers = await AnswerService.getAnswerById(req.params.id);
            res.json(answers);
        }
    } catch (error) {
        next(error);
    }
}

const AnswerController = {
    createAnswer,
    getAllAnswer,
    editAnswer,
    deleteAnswer,
    getAnswerById
}

module.exports = AnswerController