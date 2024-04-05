const Product = require("../models/product_model");

var productController = {
    addProduct: async (req,res)=> {
        try {
            const {storeId, productName, productAmount, productPrice} = req.body;
            console.table(req.body);

            // เมื่อได้รับข้อมูลเข้ามาแล้วให้ทำการสร้าง new model 
            let product = new Product({
                storeId,
                productName,
                productAmount,
                productPrice
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
            // console.log(id);

            // get dara from body
            const {productName, productAmount, productPrice} = req.body;
            console.table(req.body);

            // find by id and update
            const productUpdateInstance = await Product.findByIdAndUpdate(id,{productName:productName, productAmount:productAmount, productPrice:productPrice});
            console.log(productUpdateInstance);
            if(productUpdateInstance) {
                return res.status(200).json({
                    status: 200,
                    message:"Update product successful",
                    // data:
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message:"Update product fails",
                    // data:
                })
            }
            
        } catch(error) {
            console.log(err);
            res.status(400).json({
                status: 400,
                message:"Fails to update product",
                error
            })
        }
    },
    showAllProducts: async (req,res) => {
        try {
            let allProductsInstance = await Product.find({});
            // console.table(allProductsInstance);
            res.status(200).json({
                status : 200,
                data: allProductsInstance
            });
        } catch(error) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message:"Fails to Show All Products"
            });
        }
    },
    showProductById: async (req, res) => {
        try {
            // รับค่า params 
            const {id} = req.params;
            console.log(id);
            
            let productInstance = await Product.findById(id);
            console.log(productInstance);
            if(productInstance){
                return  res.status(200).json({
                        status: 200,
                        message: "Successfully product by id",
                        data: productInstance
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Product Not Found"
                });
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: "Fails to fetch product by Id"
            });
        }
    }
}

module.exports = productController