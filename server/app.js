import express from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {ErrorMiddleware} from './middleware/error.js';
import userRouter from './routers/userRoute.js';
import courseRouter from './routers/courseRoute.js';
import orderRouter from './routers/orderRoute.js';
import notificationRouter from './routers/notificationRoute.js';
import analyticsRouter from './routers/analyticsRoute.js';
import layoutRouters from './routers/layoutRoute.js';



// make body perser
app.use(express.json({ limit: "50mb" }))

// cookie perser
app.use(cookieParser());

// cors
app.use(cors({ origin: process.env.ORIGIN }));

// Router
app.use('/api/v1', userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouters);

// testing api
app.get('/test', (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Hi sontu"
    });
})

app.use(ErrorMiddleware)