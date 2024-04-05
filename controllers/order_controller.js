var Order = require("../models/order_models");
var Product = require("../models/product_model");
const mongoose = require('mongoose');

var orderController = {
    // เพิ่ม order ไปยัง product
    createOrder: async (req,res) => {
        try {
            const {id} = req.params;
            const {productId, orderName, orderProductAmount} = req.body

            console.table(req.body);
            console.log(req.params.id);

            // ดึงข้อมูลของ product by id
            let product = await Product.findById(id);
            let productPrice = product.productPrice;
            if(!product){
                return  res.status(404).json({
                        status: 404,
                        message:"Product Not Found"
                });
            }
            
            // ถ้าเจอทำงานต่อไป
            // console.log("product = ", product);

            // ทำการเช็คว่าจำนวนของ สินค้ามีมากกว่าหรือเท่ากับไหม
            if(product.productAmount >= orderProductAmount){
                
                // ทำการลบจำนวนสินค้า
                product.productAmount -= orderProductAmount;
                product.save();

                // คำนวนราคา
                // console.log(typeof(orderProductAmount));
                // console.log(typeof(product.productPrice));
                let orderProductTotalPrice = orderProductAmount * productPrice;

                console.log(orderProductTotalPrice);
                // create  new order
                let order = new Order({
                    productId,
                    orderName,
                    orderProductAmount,
                    orderProductTotalPrice
                });

                let orderInstance = await order.save();
                console.log("orderInstance = ", orderInstance);
                
                if(orderInstance){
                    // ให้เอา order push เข้าไปที่ orders ของ product
                    let productAddOrder = await Product.findById(id);
                    productAddOrder.orders.push(orderInstance._id);
                    productAddOrder.save();
                }

                res.status(201).json({
                    status: 201,
                    message: "Create order complete",
                    data: orderInstance
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Product not enough"
                });
            }
        
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status:400,
                message: "Create Order Fails"
            });
        }
    },
    showAllOrder: async (req,res) => {
        try {
            // เรียกใช้งานโมเดล order 
            const orderInstance = await Order.find({});
            // console.log(orderInstance);
            

            res.status(201).json({
                status: 201,
                message: "fetch all orders complete",
                data: orderInstance
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status:400,
                message: "Show Orders Fails"
            })
        }
    },
    showOrderByProductId: async (req, res) => {
        try {
            // const id = req.params;
            const {id} = req.params
            //อย่าลืม destructuring ออกมาไม่งั้นมันจะเป็น object
            console.log("id = ",id);

          
            // let findId = 660e683a03badeaf3f7f3ebd
           

            let ordersByProductId = await Order.aggregate([
                {$match: { productId: new mongoose.Types.ObjectId(id) }}
            ]);
            console.log("ordersByProductId = ", ordersByProductId);

            let allOrderIdProduct = await Product.findById(id);
            // เอาเฉพาะ orders ออกมาโชว์



            // console.log(ordersByProductId);
            res.status(201).json({
                status: 201,
                message: "hello order product",
                data: ordersByProductId
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: "Fails to show order from product"
            })
        }
    }
}

module.exports = orderController