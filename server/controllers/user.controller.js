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
)