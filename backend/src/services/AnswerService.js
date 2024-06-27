const Answer = require("../models/AnswerModels");

async function createAnswer({ imgUrl, title }) {
    const answer = new Answer({
        body
    });
    try {
        const newDoc = await answer.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAllAnswer() {
    try {
        return await Answer.find();
    } catch (error) {
        throw error;
    }
}

async function editAnswer(id, updateData) {
    try {
        await Answer.findByIdAndUpdate(id, updateData);
        return await Answer.findById(id);
    } catch (error) {
        throw error;
    }
}

async function deleteAnswer(id) {
    try {
        await Banner.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

async function getAnswerById(id) {
    try {
        return await Answer.findById(id);
    } catch (error) {
        throw error;
    }
}

const AnswerService = {
    createAnswer,
    getAllAnswer,
    editAnswer,
    deleteAnswer,
    getAnswerById
}

module.exports = AnswerService