const Question = require("../models/QuestionModels");

async function createQuestion({ title, body, status }) {
    const question = new Question({
        title,
        body,
        status
    });
    try {
        const newDoc = await question.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAllQuestion() {
    try {
        return await Question.find();
    } catch (error) {
        throw error;
    }
}

async function editQuestion(id, updateData) {
    try {
        await Question.findByIdAndUpdate(id, updateData);
        return await Question.findById(id);
    } catch (error) {
        throw error;
    }
}

async function deleteQuestion(id) {
    try {
        await Banner.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

async function getQuestionById(id) {
    try {
        return await Question.findById(id);
    } catch (error) {
        throw error;
    }
}

const QuestionService = {
    createQuestion,
    getAllQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionById
}

module.exports = QuestionService