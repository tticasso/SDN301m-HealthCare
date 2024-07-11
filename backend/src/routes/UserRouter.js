const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authMiddleware')

userRouter.use(bodyParser.json())

userRouter.post('/create', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/', userController.getAllUsers);
userRouter.put('/status/:id', userController.changeStatus);
module.exports = userRouter;