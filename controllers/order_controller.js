var Order = require("../models/order_models");
var Product = require("../models/product_model");

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
            })
        }
    }
}

module.exports = orderController