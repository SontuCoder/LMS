import dotenv from 'dotenv';
dotenv.config();
import redis from '../config/redis.js';


//parse environment variales to integrates with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

//option for cookies
export const accessToenOption = {
    expires : new Date(Date.now() + accessTokenExpire*60*1000),
    maxAge: accessTokenExpire*60*1000,
    httpOnly : true,
    sameSite: 'lax',
};

export const refreshToenOption = {
    expires : new Date(Date.now() + refreshTokenExpire*24*60*60*1000),
    maxAge: refreshTokenExpire*24*60*60*1000,
    httpOnly : true,
    sameSite: 'lax',
};

export const sendToken = (user, statusCode, res)=>{
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    
    //upload session to redis
    redis.set(user._id.toString(), JSON.stringify(user));

    // only set secure to true in production
    if (process.env.NODE_ENV === 'production') {
        accessToenOption.secure = true;
    }

    // set the cookies
    res.cookie('access_token', accessToken, accessToenOption);
    res.cookie('refresh_token', refreshToken, refreshToenOption);

    return res.status(statusCode).json({
        success: true,
        user,
        accessToken
    });

}