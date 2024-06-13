const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('express-jwt');

const registerUser = async (name, email, password) => {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error('Email đã được sử dụng');
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};


const createUser = async (user) => {
    let newUser = await User.findOne({email: user.email});
    if (newUser) {
        throw new Error('Email đã được sử dụng');
    }
    newUser = user;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    return newUser;
};

const getUser = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }
    return user;
};

// Cập nhật thông tin người dùng
const updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password');
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }
    return user;
};

// Xóa người dùng
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }
};

// Lấy tất cả người dùng
const getAllUsers = async () => {
    const users = await User.find().select('-password');
    return users;
};


const userService = {
    registerUser,
    loginUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
}

module.exports = userService;