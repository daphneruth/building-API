const express = require('express');
const userController = require('./../controller/userController');

const router = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
