const mongoose = require('mongoose')
const {Schema} = mongoose

const questionSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Title is required']
    },
    body: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    created_at: Date.now()
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question