const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    
    product_code: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true

    },
    product_gst: {
        type: Number,
        required: true

    },
    product_price: {
        type: Number,
        required: true

    }
}, {

    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;