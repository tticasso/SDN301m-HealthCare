const nodemailer = require('nodemailer');


const sendActivationEmail = async (userEmail, token, fullname) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rotatoby23@gmail.com',
            pass: 'gmbluywuqnapjccx'
        }
    });

    const mailOptions = {
        from: 'rotatoby23@gmail.com',
        to: userEmail,
        subject: 'Activate your account',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        font-weight: bold;
                        color: white;
                        background-color: #007BFF;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <p>Chào bạn,</p>
                <p>Vui lòng kích hoạt tài khoản của bạn bằng cách nhấn vào nút bên dưới:</p>
                <a href="http://localhost:9999/auth/activate?token=${token}"><button style="color:white; background-color: #4374E0; outline: none; height: 40px; width: 150px; border-radius: 20px;">Kích hoạt tài khoản</button></a>
                <p>Trân trọng,<br/>Đội ngũ hỗ trợ của chúng tôi</p>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendActivationEmail
};
