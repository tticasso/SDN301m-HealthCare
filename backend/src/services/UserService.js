const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const registerUser = async (user) => {
    if (await User.findOne({ email: user.email })) {
        throw new Error('Email đã được sử dụng');
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(user.password, salt)
    const newUser = new User({
        email: user.email,
        password: hashed,
        fullname: user.fullname,
        role: user.role
    })
    newUser.save();
    return newUser;
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
    if(user && isMatch) {
        const token = jwt.sign({
            id: user.id
        },
        process.env.JWT_SECRET, { expiresIn : '1h'})
        const {id, role} = user
        const login = {id, role};
        return {login, token};
    }
}


const createUser = async (user) => {
    if (await User.findOne({ email: user.email })) {
        throw new Error('Email đã được sử dụng');
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(user.password, salt)
    const newUser = new User({
        email: user.email,
        password: hashed,
        fullname: user.fullname,
        role: user.role,
        status: user.status,

    })
    newUser.save();
    return newUser;
}


const getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }
    return user;
};

// Cập nhật thông tin người dùng
const updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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
    const users = await User.find();
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