const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const eSchema=new mongoose.Schema({
    yourName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

eSchema.pre("save",async function(next){

    if(this.isModified("password"))
    {
        // const passwordHash=await bcrypt.hash(password,10);
        // console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        // console.log(`the current password is $ `);
        // next();
        this.confirmPassword=undefined;
    }
})


const Register=new mongoose.model("Register",eSchema );
module.exports=Register;