const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/marketplace")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log('failed');
})

const userSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true
    }, 
    password:{
        type:String, 
        required:true
    }
})

const collection = mongoose.model("collection", userSchema)

module.exports=collection