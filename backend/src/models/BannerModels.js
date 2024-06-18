const mongoose = require('mongoose')
const {Schema} = mongoose

const bannerSchema = new Schema({
    imgUrl: {
        type: String,
        required: [true, "Img is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    }
})

const Banner = mongoose.model('Banner', bannerSchema)
module.exports = Banner