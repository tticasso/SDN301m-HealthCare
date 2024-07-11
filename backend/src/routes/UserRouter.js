const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

userRouter.use(bodyParser.json())

userRouter.post('/create',roleMiddleware("ADMIN"), userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id',roleMiddleware("ADMIN"), userController.deleteUser);
userRouter.get('/', userController.getAllUsers);
module.exports = userRouter;

