import ErrorHandler from "../utils/ErrorHandler.js";
import { AsyncErrorMiddle } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';

export const authenticated = AsyncErrorMiddle(async(req, res, next)=>{
    const access_token = req.cookies.access_token;
    if(!access_token){
        return next(new ErrorHandler("Please login to access this resorce.", 400));
    }
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

    if(!decoded){
        return next(new ErrorHandler("access token is not valid.", 400));
    }

    const user = await redis.get(decoded.id);
    if(!user){
        return next(new ErrorHandler("User not found.", 400));
    }
    req.user = JSON.parse(user);
    next();
});


// validate user role

export const autherizeRoles = (...roles)=>{
    return ( req, res, next)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
};