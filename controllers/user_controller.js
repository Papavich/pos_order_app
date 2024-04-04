// import model
const User = require("../models/user_model");

// import bcrypt
const bcrypt = require('bcrypt');

var userController = {
    // login 
    userLogin: async (req,res)=>{
        try {
            // get dat from body
            const {userEmail, userPassword} = req.body;
            console.table(req.body);

            // เช็คในบานข้อมูลมี email หรือไม่
            let userInstance = await User.findOne({userEmail:userEmail})
            if(userInstance){
                // console.log("is user ", userInstance);
                // ถ้ามีอีเมลก็ให้ทำการ เช็ค password ต่อไป
                let decodePassword = await bcrypt.compare(userPassword,userInstance.userPassword);
                console.log("decode password = ", decodePassword);

                res.status(200).json({
                    message:"Login Sucessful",
                    token: "1234" 
                })

            } else {
            return res.status(404).json({
                status:400,
                message:"Login Fails Wrong Email or Password"

            })}
            
        } catch (error) {   
            res.status(500).send(error.toString());
        }
    }
}


module.exports = userController;