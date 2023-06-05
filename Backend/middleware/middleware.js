const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req , res , next)=>{
  let token = req.headers['token'];
  jwt.verify(token , process.env.TOKEN_SECRET_KEY , (err , decoded)=>{
      if(!err){
          req.decoded = decoded;
          next();
      }else{
          res.status(403).json({"Message":"Not Authorized"})
      }
  });
};

module.exports = {
  verifyToken
};