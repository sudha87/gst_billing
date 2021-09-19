require("./db/mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const Product = require('./models/product');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/products', async (req, res) => {
    try {
        if (!req.body.product_code || !req.body.product_name || !req.body.product_gst || !req.body.product_price) {
            res.status(400).send("Please Enter all the details");
            return;
        }
        var product = new Product(req.body);
        await product.save();
        res.status(201).send({
            msg: "product saved",
            product: product
        })
    } catch (err) {
        res.status(500).send("Internal server error");
    }
})

app.get('/api/productSearch', async (req, res) => {
    try {
        if (!req.query.searchTxt) {
            res.status(400).send("Please enter something to search");
            return;
        }
        var searchObj = {
            $or: [

                { 'product_code': req.query.searchTxt },
                { 'product_name': req.query.searchTxt }
            ]
        }
        var searchProduct = await Product.find(searchObj);
        res.status(200).send(searchProduct)
    } catch (e) {
        res.status(500).send("Internal Server Error")
    }
})

var total = 0;
var orderItemArr = [];

async function calculateTotal(item) {
    var product = await Product.findOne({ product_code: item.product_code });
    var originalPrice = product.product_price * item.quantity;
    var gst = originalPrice * product.product_gst;
    var totalCost = originalPrice + gst;
    total += totalCost;

    var itemObj = {
        product_id: product._id,
        quantity: item.quantity
    }
    orderItemArr.push(itemObj);
}

app.post('/api/totalCost', async (req, res) => {

    try {

        total = 0;
        var costPromise = [];
        var itemArr = req.body;

        itemArr.forEach(function (item) {
            costPromise.push(calculateTotal(item));
        })

        await Promise.all(costPromise);

        var orderObj = {
            no_of_products: itemArr.length,
            total_price: total
        }

        var order = new Order(orderObj);
        await order.save();


        orderItemArr.forEach(function (itemObj) {
            itemObj.order_id = order._id
        })
        await OrderItem.insertMany(orderItemArr)

        res.status(200).send({
            total: total
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
})


app.get('/api/billHistory', async (req, res) => {
    try {
        var createdAt = {}

        if (req.query.startDate && req.query.endDate) {

            createdAt = {
                $gte: new Date(new Date(req.query.startDate).setHours(00, 00, 00)),
                $lte: new Date(new Date(req.query.endDate).setHours(23, 59, 59))
            }

        }
        var billHistory = await Order.find({
            createdAt: createdAt
        }).populate('orderItem').exec();

        res.status(200).send({
            msg: "Bill History",
            billHistory: billHistory,
        })

    } catch (e) {
        res.status(500).send("Internal Server Error");
    }

})

app.listen(9000, function () {
    console.log("Gst server is working at 9000")
});