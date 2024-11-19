const express=require("express")
const {userRouter}=require("./routes/userRoute")
const{adminRouter}=require("./routes/adminRoute")
const mongoose=require("mongoose")
const app=express()
require("dotenv").config()

app.use(express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to the database")
    app.listen(process.env.PORT||3000,()=>{
        console.log("listening on port 3000")
    })
}
main();