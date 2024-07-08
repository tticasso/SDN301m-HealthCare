const express = require('express')
const bodyParser = require('body-parser')
const AuthController = require('../controllers/Auth.controller')
const authRouter = express.Router()

authRouter.use(bodyParser.json())
authRouter.post('/active-account', AuthController.createActivationToken);
authRouter.get('/activate', AuthController.activateAccount);

module.exports = authRouter;
