import express from 'express';
import {uploadCourse, editCourse, getSingleCourse, getAllCourse, getCourseByUser, addQuestions, addAnswer, addReview, replyToReview, getAllCoursesAdmin, deleteCourse} from '../controllers/course.controller.js';
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
courseRouter.put('/add-reply',authenticated,autherizeRoles("admin"), replyToReview);
courseRouter.get('/get-all-courses',authenticated,autherizeRoles("admin"), getAllCoursesAdmin);
courseRouter.delete('/delete-course/:id',authenticated,autherizeRoles("admin"), deleteCourse);


export default courseRouter;