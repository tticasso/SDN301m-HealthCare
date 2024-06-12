const userService = require('../services/UserService')

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const token = await userService.registerUser(name, email, password);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userService.createUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Đọc thông tin người dùng
exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'Người dùng đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả người dùng (ví dụ thêm)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};