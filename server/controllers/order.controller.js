import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Course from '../models/course.model.js';
import Notification from '../models/notification.model.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ejs, { Template } from 'ejs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import sendMail from '../utils/SendMail.js';

// Create new order
export const createOrder = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { courseId, payment_info } = req.body;

        // Validate course and user
        const user = await User.findById(req.user?._id);

        const courseInUser = user?.courses.some((course) => course._id.toString() === courseId);

        if (courseInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400));
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course is not found.", 400));
        }

        const data = await Order.create({
            courseId: courseId,
            userId: user?._id,
            payment_info
        });

        const order = await Order.create(data);
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-mail.ejs'), { order: mailData });

        try {
            if(user){
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-mail.ejs",
                    data: mailData,
                });
            }

        } catch (err) {
            return next(new ErrorHandler(err.message, 500));
        }
        user?.courses.push(courseId);
        await user?.save();

        await Notification.create({
            userId: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        });

        if (course) {
            course.purchased += 1;
        }
        await course.save();
        return res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
