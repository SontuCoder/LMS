import express from 'express';
import {registrationUser, activateUser, loginUser, logoutUser,updateAccessToken, getUserInfo, socialAuth} from '../controllers/user.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout',authenticated, logoutUser);
userRouter.get('/refresh',updateAccessToken);
userRouter.get('/me',authenticated,getUserInfo);
userRouter.post('/social-auth',socialAuth);



export default userRouter;