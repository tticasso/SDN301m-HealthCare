const { StatusCodes, getReasonPhrase } = require('http-status-codes')
const Conversation = require('../models/ConversationModels')
const dayjs = require("dayjs");
const response = async (res, code, status, data, message) => {
    if (!message) {
        message = getReasonPhrase(code);
    }
    return res.status(code).json({
        status: status,
        data: data,
        message: message,
    });
};

async function createConversation(req, res) {
    try {
        const { name = "", participants, lastMessage = "" } = req.body;

        const newConversation = new Conversation({
            name,
            participants,
            lastMessage,
        });
        const conversation = await newConversation.save();
        return response(res, StatusCodes.ACCEPTED, true, { conversation }, null);
    } catch (error) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            true,
            { conversation: {} },
            null
        );
    }
};

async function getConversationById(req, res) {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        return response(res, StatusCodes.ACCEPTED, true, { conversation }, null);
    } catch (error) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            true,
            { conversation: {} },
            null
        );
    }
}

async function getConversationByUserid(req, res) {
    try {
        const { userId } = req.body;
        console.log("====================================");
        console.log(userId);
        console.log("====================================");

        const conversations = await Conversation.find({
            participants: { $in: [userId] },
        })
            .populate({
                path: "participants",
                select: "fullName phone email photo",
            })
            .sort({
                updatedAt: -1,
            });

        return response(res, StatusCodes.ACCEPTED, true, { conversations }, null);
    } catch (error) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            true,
            { conversations: [] },
            null
        );
    }
}

async function updateConversation(id) {
    try {
        const conversation = await Conversation.findByIdAndUpdate(
            id,
            {
                updatedAt: dayjs().toISOString(),
            },
            {
                new: true,
            }
        );
        console.log('====================================');
        console.log(conversation);
        console.log('====================================');
        if (!conversation) {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function deleteConversation(req, res) {
    try {
        const deletedConversation = await Conversation.findByIdAndDelete(
            req.params.id
        );
        if (!deletedConversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        return response(
            res,
            StatusCodes.ACCEPTED,
            true,
            { conversation: deletedConversation },
            null
        );
    } catch (error) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            true,
            { conversation: {} },
            null
        );
    }
}

const ConversationController = {
    createConversation,
    getConversationById,
    getConversationByUserid,
    updateConversation,
    deleteConversation
}

module.exports = ConversationController