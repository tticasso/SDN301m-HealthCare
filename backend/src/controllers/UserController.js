//const userService = require('../services/UserService')
const userService = require('../services/UserService')

async function registerUser (req, res) {
    const { name, email, password } = req.body;
    try {
        const token = await userService.registerUser(name, email, password);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function loginUser (req, res) {
    const { email, password } = req.body;
    try {
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function createUser (req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Đọc thông tin người dùng
async function getUser (req, res) {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin người dùng
async function updateUser (req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa người dùng
async function deleteUser (req, res) {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'Người dùng đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả người dùng 
async function getAllUsers (req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const userController = {
    registerUser,
    loginUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
}

module.exports = userController;