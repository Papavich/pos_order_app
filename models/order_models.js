const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    orderName: {
        type: String,
        require: true
    },
    // เดี๋ยวเอาจำนวนไปลบกับจำนวนของสินค้าที่อยู่ใน product
    orderProductAmount: {
        type: Number,
        require: true
    },
    orderProductTotalPrice: {
        type: Number,
        default: 0
    },
    
    
},{timestamps: true});

// create model 
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;