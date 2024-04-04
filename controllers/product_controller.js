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
        
    },
    deleteProduct: async (req,res) => {
        try {
            // get product by params
            const {id} = req.params;
            // console.log("productId = ", id);

            // เช็คก่อนว่ามี product นั้นอยู่หรือไม่
            let productInstance = await Product.findById(id);
            if(!productInstance){
               return res.status(400).json({
                    message:"Delete Product fails, Don't have this product in store",
                    
                })
            }

            // delete product
            let deletedProductInstance = await Product.findByIdAndDelete(id);
            if(deletedProductInstance){
               return res.status(201).json({
                    message:"Delete product successfull" ,
                    data: deletedProductInstance
                });
            }
           
        } catch (error) {
            console.log(error);
           return res.status(400).json({
                message:"Delete Product fails",
                error
            })
        }
    },
    updateProduct: async (req,res) => {
        try {
            // get product id by params 
            const {id} = req.params;
            console.log(id);

            res.status(201).json({
                message:"Update product successful",
                // data:
            })
        } catch(error) {
            console.log(err);
            res.status(400).json({
                message:"Fails to update product",
                error
            })
        }
    }
}

module.exports = productController