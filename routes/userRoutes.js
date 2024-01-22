const { registerUser, loginUser, findUsreById } = require('../controllers/UserController');
const isAuth = require('../middlewares/authMiddleware');

const userRoute = require('express').Router();

userRoute.post(`/register`, registerUser);
userRoute.post(`/login`, loginUser);
userRoute.get(`/user/:id`, isAuth, findUsreById);

module.exports = userRoute