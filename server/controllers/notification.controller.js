import Notification from '../models/notification.model.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import corn from 'node-cron';

// get new notification -- only for admin
export const getNotification = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            notifications
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// update notification status
export const updateNotification = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return next(new ErrorHandler('Notification not found', 404));
        }

        notification.status ? notification.status = "read" : notification.status;

        await notification.save();

        const notifications = await Notification.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// delete notification
corn.schedule('0 0 0 * * *', async () => {
        const time = new Date(Date.now() - 30*24*60*60*1000);
        await Notification.deleteMany({status:"read", createdAt:{$lt: time}});
});
