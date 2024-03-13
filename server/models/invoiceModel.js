const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
    {
        payment_method: { type: String, enum: ['cash', 'credit-card', 'e-wallet'], required: true }, //kiểu thanh toán
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        items_price: { type: Number, required: true }, //tiền hàng
        shipping_price: { type: Number, required: true }, //tiền ship
        promotion: { type: Number, required: true }, //khuyến mãi
        total_price: { type: Number, required: true }, //tổng tiền
        client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //người mua
        paid_time: { type: Date },
        message: { type: String, maxlength: 200 },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() }
    });

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice;
