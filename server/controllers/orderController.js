const { default: mongoose } = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Transaction = require('../models/transactionModel');

const orderController = {
    //Add order
    createOrder: async (req, res) => {
        try {
            const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, user, address, phone } = req.body;
            if (!orderItems || !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address, !phone) {
                return res.status(400).json({
                    result: null,
                    success: false,
                    message: 'the input is required.',
                })
            }
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findByIdAndUpdate(
                    {
                        _id: order.product,
                        countInstock: { $gte: order.amount } //kiem tra xem hang con lai bao nhieu
                    },
                    {
                        $inc: {
                            countInstock: -order.amount,   //tru so luong hang trong kho
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    return res.status(201).json({
                        message: "Success"
                    })
                }
                else {
                    return res.status(401).json({
                        message: "not successful",
                        id: order.product
                    })
                }
            })

            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'Err',
                    message: `Product by id: ${arrId.join(',')} not enough`,
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address, phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    user: user,
                    totalPrice,
                })
                if (!createdOrder) {
                    return res.status(403).json({
                        success: false,
                        message: "Order not successful",
                    })
                }
                return res.status(200).send({
                    success: true,
                    data: createdOrder,
                    message: "Order successfully"
                })
            }

        } catch (err) {
            res.status(501).json({ success: false, message: 'error server' });
        }
    },
}

module.exports = orderController;
