const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const ConversationController = require('./ConversationController');
const Chat = require('../models/ChatModels')

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

async function createChat(message) {
    try {
        // Create new chat
        const newChat = new Chat(message);

        const chat = await newChat.save();
        ConversationController.updateConversation(message.conversationId, message)
        return chat;
    } catch (error) {
        console.log("error", error);
        return false;
    }
}

async function getChatById(req, res) {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        return response(res, StatusCodes.ACCEPTED, true, { chat }, null);
    } catch (error) {
        return response(res, StatusCodes.BAD_REQUEST, true, { chat: {} }, null);
    }
}

async function getChatByConversationId(req, res) {
    try {
        const { conversationId } = req.body;
        const chats = await Chat.find({
            conversationId,
        })
            .populate({
                path: "sendBy",
                select: "fullName photo",
            })
            .populate({
                path: "to",
                select: "fullName photo",
            })
            .sort({
                createAt: -1,
            });

        return response(res, StatusCodes.ACCEPTED, true, { chats }, null);
    } catch (error) {
        return response(res, StatusCodes.BAD_REQUEST, true, { chats: [] }, null);
    }
}

async function updateChat(req, res){
    try {
        const { name, participants, lastMessage } = req.body;
        const updatedChat = await Chat.findByIdAndUpdate(
          req.params.id,
          { name, participants, lastMessage, updatedAt: Date.now() },
          { new: true }
        );
        if (!updatedChat) {
          return res.status(404).json({ error: "Chat not found" });
        }
        return response(
          res,
          StatusCodes.ACCEPTED,
          true,
          { chat: updatedChat },
          null
        );
      } catch (error) {
        return response(res, StatusCodes.BAD_REQUEST, true, { chat: {} }, null);
      }
}

async function deleteChat(req, res){
    try {
        const deletedChat = await Chat.findByIdAndDelete(req.params.id);
        if (!deletedChat) {
          return res.status(404).json({ error: "Chat not found" });
        }
        return response(
          res,
          StatusCodes.ACCEPTED,
          true,
          { chat: deletedChat },
          null
        );
      } catch (error) {
        return response(res, StatusCodes.BAD_REQUEST, true, { chat: {} }, null);
      }
}

const ChatController = {
    createChat,
    getChatById,
    getChatByConversationId,
    updateChat,
    deleteChat
}

module.exports = ChatController