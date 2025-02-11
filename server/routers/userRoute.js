import express from 'express';
import {registrationUser, activateUser, loginUser, logoutUser,updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updateUserPass, updateUserAvatar, getAllUsersAdmin, updateUserRole, deleteUser} from '../controllers/user.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout',authenticated, logoutUser);
userRouter.get('/refresh',updateAccessToken);
userRouter.get('/me',authenticated,getUserInfo);
userRouter.post('/social-auth',socialAuth);
userRouter.put('/update-user-info', authenticated, updateUserInfo);
userRouter.put('/update-user-password', authenticated, updateUserPass);

userRouter.put('/update-user-avater',authenticated, updateUserAvatar);
userRouter.get('/get-all-users',authenticated,autherizeRoles('admin'),getAllUsersAdmin);

userRouter.put('/update-user-role',authenticated,autherizeRoles('admin'),updateUserRole);

userRouter.delete('/delete-user/:id',authenticated,autherizeRoles('admin'),deleteUser);



export default userRouter;