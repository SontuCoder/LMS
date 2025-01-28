import express from 'express';
import {createOrder, getOrdersAdmin} from '../controllers/order.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const orderRouter = express.Router();


orderRouter.post('/create-order', authenticated, createOrder);
orderRouter.get('/get-orders', authenticated, autherizeRoles('admin'), getOrdersAdmin);

export default orderRouter;