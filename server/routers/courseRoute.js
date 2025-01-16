import express from 'express';
import {uploadCourse} from '../controllers/course.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const courseRouter = express.Router();

courseRouter.post('/upload-course',authenticated,autherizeRoles('admin'), uploadCourse);


export default courseRouter;