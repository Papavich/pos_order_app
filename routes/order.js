var express = require('express');
var router = express.Router();

const authenticateToken = require("../services/checkUserToken");

const orderController = require("../controllers/order_controller");

// create order to product
router.post("/api/v1/products/:id/orders",authenticateToken,orderController.createOrder)


//show all order
router.get("/api/v1/orders", authenticateToken, orderController.showAllOrder); 

// show orders by product id
router.get("/api/v1/products/:id/orders",authenticateToken, orderController.showOrderByProductId);

// export product route
module.exports = router;