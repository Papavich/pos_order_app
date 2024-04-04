const Product = require("../models/product_model");

var productController = {
    addProduct: async (req,res)=> {
        try {
            const {storeId, productName, productAmount} = req.body;
            console.table(req.body);

            // เมื่อได้รับข้อมูลเข้ามาแล้วให้ทำการสร้าง new model 
            let product = new Product({
                storeId,
                productName,
                productAmount
            });
           let productInstance = await product.save();

            res.status(201).json({
                message: "add product successful",
                data: productInstance
            });
        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: "add product fails",
                error
            })
        }
        
    }
}

module.exports = productController