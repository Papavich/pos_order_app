const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    productName: {
        type: String,
        unique:true,
        require: true
    },
    productAmount: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    orders: [
        // ไว้สำหรับเก็บ order Id
    
            {type: mongoose.SchemaTypes.ObjectId, default:""},
            
    
    ]
},{timestamps: true});

// create model 
const Product = mongoose.model("products", productSchema);

module.exports = Product;