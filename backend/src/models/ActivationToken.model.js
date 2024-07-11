const mongoose = require('mongoose');

const activationTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

// Tự động xóa tài liệu khi hết hạn
activationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 120 });

const ActivationToken = mongoose.model('ActivationToken', activationTokenSchema);

module.exports = ActivationToken;
