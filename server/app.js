import express from 'express';
export const app = express();


import cors from 'cors';
import cookieParser from 'cookie-parser';

// make body perser
app.use(express.json({ limit: "50mb" }))

// cookie perser
app.use(cookieParser());

// cors
app.use(cors({ origin: process.env.ORIGIN }));

// testing api
app.get('/test', (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Hi sontu"
    });
})

