import express from 'express';
import {createOrder} from '../controllers/order.controller.js';
import {authenticated, autherizeRoles} from '../middleware/auth.js';

const orderRouter = express.Router();


orderRouter.post('/create-order', authenticated, createOrder);


export default orderRouter;