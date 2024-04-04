var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

// middleware
const authenticateToken = require("../services/checkUserToken");

// import model 
const Users = require("../models/user_model");

// import user controller;
const userController = require("../controllers/user_controller");

// create user api
router.post("/api/v1/register", async (req,res) => {
    try {
    //    get data from body
    const {userName, userEmail, userPassword, userRole} = req.body;
    
    // use bycrpt  to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(userPassword,salt);
    
    
    console.log(userPassword);

    // create new model 
    let  user = new Users({
        userName,
        userEmail,
        userPassword:hashedPass
    })
    // save model
    await user.save();
    res.json({
        status:200,
        mesage: "create user successful",
        data: user 
    });
    } catch (error){
        res.status(500).send(error.toString());
    }
});

// route login 
router.post("/api/v1/login", userController.userLogin);

// approve by admin
router.put("/api/v1/approve/:id", userController.userApprove);

// user get data
router.get("/api/v1/user-detail",authenticateToken, userController.userDetail );

module.exports = router;
