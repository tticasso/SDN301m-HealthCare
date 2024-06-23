const mongoose = require('mongoose')
const {Schema} = mongoose;

const docScheduleSchema = new mongoose.Schema({
    // ca làm việc
    time:{
        type: Date,
        required: [true, "Time is required"],
        validate: function(v) {
            return /^\d{2}:\d{2} - \d{2}:\d{2}/.test(v);
        }
    },
    // trạng thái: đã book, chưa book
    status:{
        type:Boolean,
        required: [true, "Status is required"]
    },
    // ghi chú
    note:{
        type: String
    },
    
})

const ScheduleProfile = mongoose.model('DocSchedule', docScheduleSchema);

module.exports = ScheduleProfile;