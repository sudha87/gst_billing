const mongoose = require('mongoose');
const OrderItemSchema = new mongoose.Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {

    timestamps: true
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
module.exports = OrderItem;