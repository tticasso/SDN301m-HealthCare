const conversationController = require("../controllers/ConversationController");
const Chat = require("../models/ChatModels");

async function createChat(message){
    try {
        const newChat = new Chat(message)
        const chat = await newChat.save()
        conversationController.updateConversation(message.conversationId, message)
        return chat
    } catch (error) {
        
    }
}

const chatService = {
    createChat
}
module.exports = chatService