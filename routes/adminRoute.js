const express=require("express")
const {adminModel,courseModel}=require("../db")
const{adminMiddleware}=require("../middleware/adminMiddleware")
const app=express()
const adminRouter=express.Router()
const jwt=require("jsonwebtoken")
require('dotenv').config()
const bcrypt=require("bcrypt")
app.use(express.json())


adminRouter.post("/signup",async(req,res)=>{
    const{username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,7)
    await adminModel.create({
        username:username,
        email:email,
        password:hashedPassword

    })
    res.json({
        message:"you have signed up successfully"
    })


})
adminRouter.post("/login",async(req,res)=>{
    const{username,email,password}=req.body;
    const admin= await adminModel.findOne({ email:email });
    
   
    const passwordMatch= await bcrypt.compare(password,admin.password)
    if(admin && passwordMatch){
        const token=jwt.sign({
            username:username
        },process.env.JWT_ADMIN_SECRET)
        res.json({
            token:token
        })

    }
    else{
        res.status(403).send({
            message:"incorrect credentials bro"
        })
    }
    
})
adminRouter.post("/courses",adminMiddleware,async(req,res)=>{
    const{title,description,imageUrl,price}=req.body;
    const newCourse= await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    res.json({
        message:"course is created successfully",
        courseId:newCourse._id
    })
})
adminRouter.get("/courses",adminMiddleware,async(req,res)=>{
    const allCourses=await courseModel.find({})
    res.json({
        allCourses
    })
})
module.exports={
    adminRouter:adminRouter
}