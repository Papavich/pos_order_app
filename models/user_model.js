const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        require: true,
    
    },
    userRole: {
        type: String,
        default: "user"
    },
    userApprove: {
        type: Boolean,
        default: false
    },
    userToken: {
        type: String,
        default:""
    }
},{timestamps: true});

// create model 
const Users = mongoose.model("users", userSchema);

module.exports = Users;