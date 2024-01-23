const { registerUser, loginUser, findUsreById, findAuthUser,logOutUser } = require('../controllers/UserController');
const isAuth = require('../middlewares/authMiddleware');

const userRoute = require('express').Router();

userRoute.post(`/register`, registerUser);
userRoute.post(`/login`, loginUser);
userRoute.get(`/user/:id`, isAuth, findUsreById);
userRoute.get(`/auth-user`, isAuth, findAuthUser);
userRoute.post(`/logout`, isAuth, logOutUser);



module.exports = userRoute