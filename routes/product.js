// create router
var express = require('express');
var router = express.Router();

// import service
const authenticateToken = require("../services/checkUserToken");

// import controller 
const  productController = require("../controllers/product_controller");


// router

// add product
router.post("/api/v1/products",authenticateToken, productController.addProduct);



// export product route
module.exports = router;