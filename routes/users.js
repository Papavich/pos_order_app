var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");

// import model 
const Users = require("../models/user_model");

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
        res.status(500).send(error.toString())
    }
});


module.exports = router;
