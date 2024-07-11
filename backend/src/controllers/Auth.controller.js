const authService = require('../services/Auth.service');
const userService = require('../services/UserService')


async function registerUser (req, res) {
    try {
        const token = await userService.registerUser(req.body);
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

const createActivationToken = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.createActivationToken(email);
        res.status(200).send('Email kích hoạt đã được gửi.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const activateAccount = async (req, res) => {
    try {
        const { token } = req.query;
        await authService.activateAccount(token);
        //res.status(200).send('Tài khoản đã được kích hoạt thành công.');
        return res.redirect('http://localhost:3000/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const AuthController = {
    registerUser,
    loginUser,
    createActivationToken,
    activateAccount,
}
module.exports = AuthController;
