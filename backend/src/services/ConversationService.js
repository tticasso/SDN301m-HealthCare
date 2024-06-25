const Conversation = require("../models/ConversationModels");

async function createConversation(name, participants, lastMessage){
    const conversation = new Conversation({
        name, 
        participants,
        lastMessage
    })
    try {
        const newDoc = await conversation.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function updateConversation(id){
    try {
        const conversation = await Conversation.findByIdAndUpdate(
          id,
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
        return conversation;
      } catch (error) {
        console.error('Error updating conversation:', error);
        return null;
      }
}
const conversationService = {
    createConversation,
    updateConversation
}

module.exports = conversationService