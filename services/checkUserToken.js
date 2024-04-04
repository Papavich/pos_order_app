const jwt = require("jsonwebtoken");
const SECRET = "KFC"

const authenticateToken = async (req,res,next) => {
  

    try {
        // เข้าถึง token ที่ header
        const authHeader = req.header('authorization');
        let decode = await jwt.verify(authHeader, SECRET, { algorithms: 'HS256'});
        if(decode){
            console.log("decode user token = ");
            console.table(decode);
            // ต้องทำการเช็ค approve ก่อนด้วย
            if(decode.userApprove){
                next();
            } else {
                return res.status(401).json({
                    status: 401,
                    message:"User Not Approved!"
                });
            }
        } else {
            console.log("invalid signature");
        }
    } catch (error) {
        console.log("invalid signature");
       return res.status(401).json({
            status: 401,
            message:"invalid signature"

        });
    }
    
}

module.exports = authenticateToken;


// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send({ error: 'No token provided' });
//   }

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) {
//       return res.status(403).send({ error: 'Invalid token' });
//     }

//     req.user = user;
//     next();
//   });
// }

// module.exports = authenticateToken;