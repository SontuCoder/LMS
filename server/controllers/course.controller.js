import courseModel from '../models/course.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { AsyncErrorMiddle } from '../middleware/catchAsyncError.js';
import cloudinary from 'cloudinary';
import { createCourse, getAllCoursesService } from '../services/courseService.js';
import redis from '../config/redis.js';
import mongoose from 'mongoose';
import ejs, { Template } from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import sendMail from '../utils/SendMail.js';
import Notification from '../models/notification.model.js';


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

// Edit course
export const editCourse = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            // Delete old thumbnail
            await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);

            // Upload new thumbnail
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses"
            });

            data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
            }
        }

        const courseId  = req.params.id;

        const course = await courseModel.findByIdAndUpdate(courseId,{
            $set:data},
            {new:true
        });

        res.status(201).json({
            success:true,
            course
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get Single course -- without purchasing
export const getSingleCourse = AsyncErrorMiddle(async (req, res, next) => {
    try {

        const courseId  = req.params.id;
        const isCacheExist = await redis.get(courseId); 

        if(isCacheExist){
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success:true,
                course
            })
        } else {

            const course = await courseModel.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links");
    
            await redis.set(courseId, JSON.stringify(course));

            res.status(200).json({
                success:true,
                course
            });
        }


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get all courses
export const getAllCourse = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const isCacheExist = await redis.get("allCourses"); 

        if(isCacheExist){
            const courses = JSON.parse(isCacheExist);
            res.status(200).json({
                success:true,
                courses
            })
        } else {
            const courses = await courseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links");

            await redis.set("allCourses", JSON.stringify(courses));
    
            res.status(200).json({
                success:true,
                courses
            })
        }


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// get course content  --- for valid user

export const getCourseByUser = AsyncErrorMiddle(async (req, res, next) => {
    try {

        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const isCourseExists = userCourseList?.find((course) => course._id.toString() === courseId);

        if(!isCourseExists){
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }

        const course = await courseModel.findById(courseId);

        const content = course?.courseData;

        res.status(200).json({
            success: true,
            content
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// add questions in course

export const addQuestions = AsyncErrorMiddle(async (req, res, next) => {
    try {

        const { question, courseId, contentId } = req.body;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id", 400));
        }

        const courseContent = course?.courseData?.find((item) => item._id.toString() === contentId);

        if (!courseContent) {
            return next(new ErrorHandler("Content not found", 400));
        }

        // create a new question object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: []
        };

        // add question to course content
        courseContent.question.push(newQuestion);

        await Notification.create({
            user: req.user?._id,
            title: "New Question Received",
            message: `${req.user?.name} has asked a question in ${courseContent?.title}`
        });

        // save updated course
        await course?.save();

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Add answer the question

export const addAnswer = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const courseContent = course?.courseData?.find((item) => item._id.toString() === contentId);

        if (!courseContent) {
            return next(new ErrorHandler("Content not found", 400));
        }

        const question = courseContent?.question?.find((item) => item._id.toString() === questionId);

        if (!question) {
            return next(new ErrorHandler("Question not found", 400));
        }

        const newAnswer = {
            user: req.user,
            answer
        };

        question.questionReplies.push(newAnswer);

        await course?.save();

        // notification
        if(req.user._id === question.user._id){
            await Notification.create({
                user: req.user?._id,
                title: "Your Question Answered",
                message: `Your question has been answered in ${courseContent?.title}`
            });
        } else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/questionAns-mail.ejs"),data);
            try{
                await sendMail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "questionAns-mail.ejs",
                    data
                })
            } catch (error) {
        return next(new ErrorHandler(error.message, 500));
            }
        }

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Add reviwes
export const addReview = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        // check if courseId exists in userCourseList
        const courseExists = userCourseList?.find(
            (course) => course._id.toString() === courseId
        );

        if (!courseExists) {
            return next(new ErrorHandler("You are not eligible to review this course", 404));
        }

        const course = await courseModel.findById(courseId);

        const { rating, review } = req.body;

        const reviewData = {
            user: req.user,
            rating,
            comment: review
        };

        course?.reviews.push(reviewData);

        let avg = 0;
        course.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        course.ratings = avg / course.reviews.length;

        await course?.save();

        const notification = {
            title:"New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`,
        }


        // await redis.set(courseId, JSON.stringify(course));

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// replay reviews

export const replyToReview = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { comment, courseId, reviewId } = req.body;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const review = course?.reviews?.find(
            (rev) => rev._id.toString() === reviewId
        );

        if (!review) {
            return next(new ErrorHandler("Review not found", 404));
        }

        const replyData = {
            user: req.user,
            comment
        };

        if(!review.commentReplies){
            review.commentReplies = [];
        }

        review?.commentReplies?.push(replyData);

        await course?.save();

        res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


//get all courses for admin
export const getAllCoursesAdmin = AsyncErrorMiddle(async (req, res, next) => {
    try {
        getAllCoursesService(res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// delete course by admin
export const deleteCourse = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        await courseModel?.deleteOne({_id: courseId});
        await redis.del(courseId);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});