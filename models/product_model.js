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
    }
},{timestamps: true});

// create model 
const Product = mongoose.model("products", productSchema);

module.exports = Product;