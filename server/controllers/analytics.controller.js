import { generater12MonthsData } from '../utils/Analytics.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import userModel from '../models/user.model.js';
import courseModel from '../models/course.model.js';
import Order from '../models/order.model.js';

// get user analytics by admin
export const getUserAnalytics = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const data = await generater12MonthsData(userModel);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// get course analytics by admin
export const getCourseAnalytics = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const data = await generater12MonthsData(courseModel);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// get order analytics by admin
export const getOrderAnalytics = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const data = await generater12MonthsData(Order);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

