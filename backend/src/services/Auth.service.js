const crypto = require('crypto');
const User = require('../models/UserModel');
const ActivationToken = require('../models/ActivationToken.model');
const { sendActivationEmail } = require('../ultils/mailer')

const createActivationToken = async (userEmail) => {
    const user = await User.findOne({ email: userEmail });
    
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const activationToken = new ActivationToken({
        token,
        userEmail,
        expiresAt
    });

    await activationToken.save();
    await sendActivationEmail(userEmail, token);
};

const activateAccount = async (activeToken) => {
    const activationToken = await ActivationToken.findOne({token: activeToken});

    if (!activationToken) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn.');
    }

    const user = await User.findOne({ email: activationToken.userEmail });
    if (!user) {
        throw new Error('Người dùng không tồn tại.');
    }

    user.status = true;
    await user.save();
    await ActivationToken.deleteOne({ token: activeToken });
};

module.exports = {
    createActivationToken,
    activateAccount
};
