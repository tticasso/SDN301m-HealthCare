const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

userRouter.use(bodyParser.json())

userRouter.post('/create',authMiddleware,roleMiddleware("ADMIN"), userController.createUser);
userRouter.get('/:id',authMiddleware, userController.getUser);
userRouter.put('/:id',authMiddleware, userController.updateUser);
userRouter.delete('/:id',authMiddleware,roleMiddleware("ADMIN"), userController.deleteUser);
userRouter.get('/',authMiddleware, userController.getAllUsers);
module.exports = userRouter;

