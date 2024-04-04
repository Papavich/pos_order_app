// import model
const User = require("../models/user_model");

// import bcrypt
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRET = "KFC";

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
                
                if(decodePassword) {

                    // console.table(userInstance.userEmail, userInstance.userName);
                    console.log(userInstance.userEmail);
                    console.log(userInstance.userName);

                    // create token for user
                    let token = await jwt.sign({userEmail:userInstance.userEmail, userName:userInstance.userName, userRole:userInstance.userRole}, SECRET, {algorithm: 'HS256'});
                    console.log("token = ", token);

                    // ถ้า password ถูก ให้ return ดังนี้
                    return res.status(200).json({
                    message:"Login Sucessful",
                    data: token
                    
                });
                } else {
                    // ถ้า password ผิด ให้ return ดังนี้
                   return res.status(400).json({
                    status:400,
                    message:"Login Fails Wrong Email or Password" 
                    });
                }

                

            } else {
                return  res.status(400).json({
                            status:400,
                            message:"Login Fails Wrong Email or Password"
                        })}
            
        } catch (error) {   
            res.status(500).send(error.toString());
        }
    },
    userApprove: async (req,res) =>{
        try {
            // เอา parmas id ของ user ที่เราต้องการจะอัพเดทก่อน
            const {id} = req.params;
            // const id = "1234"
            // console.log("id user = ", id);
            // เรียกใช้งาน model เพื่อทำการ update userApprove
            const userUpdateInstacne = await User.findByIdAndUpdate(id, {userApprove: true})
            if(userUpdateInstacne){
                console.log("update success");
                return  res.status(201).json({
                        message:"User Approved Successfully!",
                        data: userUpdateInstacne
                })
            } else {
                console.log("update fails");
                return  res.status(400).json({
                    message:"User Approved Fails!",
                    data: []
            })
            }
            

        } catch(error) {
            res.status(500).send(error.toString());
        }
    }
}


module.exports = userController;