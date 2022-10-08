const mongoose=require("mongoose");

//to connect database with the app.js
mongoose.connect("mongodb://localhost:27017/Authentication",{
}).then(()=>{
    console.log(`connection Successful`);
}).catch((e)=>{
    console.log(` No connection `);
})