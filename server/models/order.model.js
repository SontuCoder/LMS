import mongoose from'mongoose';

const orderSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment_info: {
        type: Object,
        // required: true
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;