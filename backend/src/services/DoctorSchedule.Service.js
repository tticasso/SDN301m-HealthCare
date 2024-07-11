const DocSchedule = require('../models/DoctorSchedule.model')
const Doctor = require('../models/DoctorProfile.Model')

//tạo 1 schedule
const createDocSchedule = async (docSchedule) => {
    const schedule = await DocSchedule.findOne({ doctor: docSchedule.doctor });
    if (schedule) {
        let checkDay = false;
        let checkSlots = false;
        let dayIndex;
        let slotTime = docSchedule.shift[0].slots[0].time;
        
        // Kiểm tra nếu ngày đã tồn tại
        schedule.shift.forEach((element, index) => {
            if (element.day === docSchedule.shift[0].day) {
                checkDay = true;
                dayIndex = index;
                // Kiểm tra nếu thời gian đã tồn tại
                element.slots.forEach(slot => {
                    if (slot.time === slotTime) {
                        checkSlots = true;
                    }
                });
            }
        });

        if (checkDay && checkSlots) {
            throw new Error('Ca làm việc đã tồn tại');
        }

        if (checkDay && !checkSlots) {
            schedule.shift[dayIndex].slots.push(docSchedule.shift[0].slots[0]);
        }

        if (!checkDay) {
            schedule.shift.push(docSchedule.shift[0]);
        }

        await schedule.save();
        return schedule;
    } else {
        const newSchedule = new DocSchedule(docSchedule);
        const data = await newSchedule.save();
        const profile = await Doctor.findOne({doctor:data.doctor})
        profile.schedule.push(data._id);
        await profile.save();
        return newSchedule;
    }

};


// Lấy 1 profile
const getDocSchedule = async (id) => {
    const docSchedule = await DocSchedule.findById(id);
    if (!docSchedule) {
        throw new Error('Ca làm không tồn tại');
    }
    return docSchedule;
};

// Cập nhật ca lam (nhan vien)
const updateDocSchedule = async (id, data) => {
    const docSchedule = await DocSchedule.findByIdAndUpdate(id, data)
    if (!docSchedule) {
        throw new Error('Ca làm không tồn tại');
    }
    return docSchedule;
};

// Xoa profile (admin)
const deleteDocSchedule = async (id) => {
    const docProfile = await DocSchedule.findByIdAndDelete(id);
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
};



const docScheduleService = {
    createDocSchedule,
    getDocSchedule,
    deleteDocSchedule,
    updateDocSchedule,
}

module.exports = docScheduleService;