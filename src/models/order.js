const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({

    no_of_products: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

OrderSchema.virtual('orderItem', {
    ref: 'OrderItem',
    localField: '_id',
    foreignField: 'order_id'
})

OrderSchema.set('toObject', { virtuals: true })
OrderSchema.set('toJSON', { virtuals: true })


const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;