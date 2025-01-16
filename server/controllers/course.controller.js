import courseModel from '../models/course.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import cloudinary from 'cloudinary';
import { createCourse } from '../services/courseService.js';


// upload couser :- 

export const uploadCourse = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        createCourse(data, res);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});