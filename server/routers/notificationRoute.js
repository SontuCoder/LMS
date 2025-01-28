import express from 'express';
const notificationRouter = express.Router();
import { getNotification, updateNotification } from '../controllers/notification.controller.js';
import { authenticated, autherizeRoles } from '../middleware/auth.js';


notificationRouter.get('/get-all-notifications',authenticated, autherizeRoles('admin'), getNotification);

notificationRouter.put('/update-notification/:id',authenticated, autherizeRoles('admin'), updateNotification);


export default notificationRouter;