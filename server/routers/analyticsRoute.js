import express from 'express';
import {authenticated, autherizeRoles} from '../middleware/auth.js';
import {getCourseAnalytics, getOrderAnalytics, getUserAnalytics} from '../controllers/analytics.controller.js';
const analyticsRouter = express.Router();

analyticsRouter.get('/get-user-analytics',authenticated,autherizeRoles('admin'), getUserAnalytics);
analyticsRouter.get('/get-course-analytics',authenticated,autherizeRoles('admin'), getCourseAnalytics);
analyticsRouter.get('/get-order-analytics',authenticated,autherizeRoles('admin'), getOrderAnalytics);

export default analyticsRouter;