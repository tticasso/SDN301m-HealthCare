const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');

userRouter.use(bodyParser.json())

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = userRouter;