var express = require('express');
var router = express.Router();

// import model 
const Stores = require("../models/store_model");

// create store api
router.post("/api/v1/register", async (req,res) => {
    try {
    //    get data from body
    const {storeName, storeEmail, storePassword} = req.body;
    
    // use bycrpt  to hash the password



    // create new model 
    let  store = new Stores({
        storeName,
        storeEmail,
        storePassword
    })
    // save model
    await store.save();

    res.json({
        status:200,
        mesage: "create store successful",
        data: store 
    })

    } catch (error){
        res.status(500).send(error.toString())
    }
});


module.exports = router;
