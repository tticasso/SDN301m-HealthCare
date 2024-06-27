const mongoose = require('mongoose')
const {Schema} = mongoose

const answerSchema = new Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    created_at: Date
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer