import { AsyncErrorMiddle } from "../middleware/catchAsyncError.js";
import Order from "../models/order.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const newOrder = AsyncErrorMiddle(async(req,res, data)=>{
        const order = await Order.create(data);
        res.status(201).json({
            success: true,
            order
        });

})