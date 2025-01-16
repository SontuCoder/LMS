import userModel from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import sendMail from '../utils/SendMail.js';
import { accessToenOption, sendToken,refreshToenOption } from '../utils/jwt.js';
import redis from '../config/redis.js';
import { getUserById } from '../services/userService.js';
import cloudinary from 'cloudinary';







// register user

export const registrationUser = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isEmail = await userModel.findOne({ email });

        if (isEmail) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        const user = new userModel({
            name,
            email,
            password
        });

        const activeCode = createActivationToken(user);
        const activationToken = activeCode.code;
        const data = { user: user.name, activationToken };

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);
        try {
            await sendMail({
                email: user.email,
                subject: "Activation your account",
                template: "activation-mail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account!`,
                token: activeCode.jwtToken,
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }

    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


export const createActivationToken = (user) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const jwtToken = jwt.sign({
        user,
        code
    },
        process.env.ACTIVATION_SECRET, {
        expiresIn: '5m'
    });

    return { jwtToken, code };
}


// activate user
export const activateUser = AsyncErrorMiddle(
    async (req, res, next) => {
        try {
            const { token, code } = req.body;
            const newUser = jwt.verify(
                token,
                process.env.ACTIVATION_SECRET
            )
            if (newUser.code !== code) {
                return next(new ErrorHandler("Invalid activation code", 400));
            }
            const { name, email, password } = newUser.user;

            const isUser = await userModel.findOne({ email });

            if (isUser) {
                return next(new ErrorHandler("Email already exist.", 400));
            }
            const user = await userModel.create({
                name, email, password
            });

            res.status(201).json({
                success: true,
                message: "Acount create successfully."
            })

        } catch (err) {
            return next(new ErrorHandler(err.message, 400));
        }
    }
);


// Login user

export const loginUser = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        sendToken(user, 200, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})


// Logout user
export const logoutUser = AsyncErrorMiddle(async (req, res, next) => {
    try {
        res.cookie('access_token', "", { maxAge: 1 });
        res.cookie('refresh_token', "", { maxAge: 1 });
        const userId = req.user?._id ||''
        redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


// update access token

export const updateAccessToken = AsyncErrorMiddle(async(req,res, next)=>{
    try{
        const refresh_token = req.cookies.refresh_token;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
        
        if(!decoded){
            return next(new ErrorHandler("Invalid refresh token", 400));
        }

        const session = await redis.get(decoded.id);

        if(!session){
            return next(new ErrorHandler("Please login to continue", 400));
        }

        const user = JSON.parse(session);

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN,
            { expiresIn: "3d" }
        );

        req.user = user;

        res.cookie("access_token", accessToken, accessToenOption);
        res.cookie("refresh_token", refreshToken, refreshToenOption);

        res.status(200).json({
            success: true,
            accessToken
        });
    
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


//get user Info

export const getUserInfo = AsyncErrorMiddle(async(req, res, next)=>{
    try{
        const userId = req.user?._id;
        return getUserById(userId,res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
})


// Social auth
export const socialAuth = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { email, name, avatar } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            sendToken(user, 200, res);
        } else {
            const newUser = await userModel.create({
                name,
                email,
                avatar
            });
            sendToken(newUser, 200, res);
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


// update user info
export const updateUserInfo = AsyncErrorMiddle(async(req, res, next)=>{
    try{
        const {name, email} = req.body;
        const userId = req.user?._id;
        const user = await userModel.findById(userId);

        if(user && email) {
            const isEmailExist = await userModel.findOne({ email });
            if(isEmailExist) {
                return next(new ErrorHandler("Email already exists", 400));
            }
            user.email = email;
        }

        if(name && user) {
            user.name = name;
        }

        await user?.save();
        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


// update user password
export const updateUserPass = AsyncErrorMiddle(async(req, res, next)=>{
    try{
        const { oldPass, newPass } = req.body;

        if (!oldPass || !newPass) {
            return next(new ErrorHandler("Please enter old and new passwords.", 400));
        }
    
        const user = await userModel.findById(req.user?._id).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid user", 400));
        }
    
        const isPassMatch = await user.comparePassword(oldPass);
        if (!isPassMatch) {
            return next(new ErrorHandler("Invalid old password", 400));
        }
    
        user.password = newPass;
        await user.save();
    
        const userId = req.user._id.toString();
        await redis.set(userId, JSON.stringify({ id: user._id }));
    
        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});


// update profile pic
export const updateUserAvatar = AsyncErrorMiddle(async (req, res, next) => {
    try{
    const { avatar } = req.body;
    const userId = req.user?._id;

    // Validate request data
    if (!avatar) {
        return next(new ErrorHandler("Please provide an avatar image.", 400));
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    // Delete previous avatar if it exists
    if (user.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    // Upload new avatar to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    // Update user avatar details
    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };

    await user.save();

    // Store only necessary user details in Redis
    await redis.set(userId.toString(), JSON.stringify({ id: user._id, avatar: user.avatar.url }));

    res.status(200).json({
        success: true,
        message: "Avatar updated successfully.",
        user
    })
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});
