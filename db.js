const mongoose=require("mongoose")
const Schema=mongoose.Schema
const objectId=mongoose.Types.objectId


const userSchema=new Schema({
    
    email:String,
    password:String,
   
})
const adminSchema=new Schema({
    email:String,
    password:String

})
const courseSchema=new Schema({
    title:String,
    description:String,
    imageUrl:String,
    price:Number

})
const purchaseSchema=new Schema({
    id:String

})

const UserModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel=mongoose.model("course",courseSchema)
const purchaseModel=mongoose.model("purchase",purchaseSchema)
module.exports={
    UserModel:UserModel,
    purchaseModel:purchaseModel,
    adminModel:adminModel,
    courseModel:courseModel
}

