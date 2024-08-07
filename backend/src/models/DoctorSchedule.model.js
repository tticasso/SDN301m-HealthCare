const mongoose = require('mongoose')
const { Schema } = mongoose;

const docScheduleSchema = new mongoose.Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // ca làm việc
    shift: [{
        day: {
            type: String,
        },
        slots: [{
            time: {
                type: String,
                required: [true, "Slots is required"],
                validate: function (v) {
                    return /^\d{2}:\d{2}-\d{2}:\d{2}$/.test(v);
                },
                message: props => `${props.value} is not a valid time format!`
            },
            // trạng thái: đã book, chưa book
            status: {
                type: Boolean,
                required: [true, "Status is required"],
                default: true,
            }, 
        }],

    }],
    // ghi chú
    note: {
        type: String
    },

})

const ScheduleProfile = mongoose.model('DocSchedule', docScheduleSchema);

module.exports = ScheduleProfile;