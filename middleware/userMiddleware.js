const jwt=require("jsonwebtoken")
require('dotenv').config();



function userMiddleware(req, res, next) {
    let token = req.headers.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (err){
        res.status(404).json({
            message: "Invalid token"
        })
      }
}
module.exports={
    userMiddleware:userMiddleware
}
  