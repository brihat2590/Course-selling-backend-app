const jwt=require("jsonwebtoken")
require("dotenv").config()
function adminMiddleware(req,res,next){
    const token=req.headers.token;
    try{
        jwt.verify(token,process.env.JWT_ADMIN_SECRET)
        next()
    }
    catch(e){
        res.status(403).send({
            message:"the token sent is invalid"
        })
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}