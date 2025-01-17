import express from 'express';
import {uploadCourse, editCourse, getSingleCourse, getAllCourse, getCourseByUser, addQuestions, addAnswer, addReview, replyToReview} from '../controllers/course.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const courseRouter = express.Router();

courseRouter.post('/upload-course',authenticated,autherizeRoles('admin'), uploadCourse);
courseRouter.put('/edit-course/:id',authenticated,autherizeRoles('admin'), editCourse);
courseRouter.get('/get-course/:id', getSingleCourse);
courseRouter.get('/get-courses', getAllCourse);
courseRouter.get('/get-course-content/:id',authenticated, getCourseByUser);
courseRouter.put('/add-question',authenticated, addQuestions);
courseRouter.put('/add-answer',authenticated, addAnswer);
courseRouter.put('/add-review/:id',authenticated, addReview);
courseRouter.put('/add-reply',authenticated,autherizeRoles("admmin"), replyToReview);


export default courseRouter;