const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const roleMiddleware = require('../middlewares/roleMiddleware')

userRouter.use(bodyParser.json())

userRouter.post('/create', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/', userController.getAllUsers);
module.exports = userRouter;

