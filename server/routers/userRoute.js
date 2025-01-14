import express from 'express';
import {registrationUser, activateUser} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);


export default userRouter;