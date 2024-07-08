const authService = require('../services/Auth.service');


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
        const { token } = req.body;
        const test = await authService.activateAccount(token);
        //res.status(200).send('Tài khoản đã được kích hoạt thành công.');
        res.status(200).json(test)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const AuthController = {
    createActivationToken,
    activateAccount,
}
module.exports = AuthController;
