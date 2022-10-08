const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
require("./db/connection");
const bcrypt=require("bcrypt");
const Register=require("./models/registers");
//to define on which port we will run server
const port=process.env.PORT || 3000;

//to use the index.html page
// const static_path=path.join(__dirname,"../public");
// app.use(express.static(static_path))

const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
// console.log(path.join(__dirname,"../public"));
// to change to look for template_path instead of views folder
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",async(req,res)=>{
    try {
        const email=req.body.Email;
        const password=req.body.Password;
        
        const userEmail=await Register.findOne({email:email});
        // console.log(userEmail);
        const isMatch=await bcrypt.compare(password,userEmail.password);
        if(isMatch)
        {
            res.status(201).render("index");
        }
        else{
            res.send(`Invalid Credentials`);
        }    
    } catch (error) {
        res.status(400).send(`Invalid Credentials`);        
    }
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmPassword;
        if(password===cpassword)
        {
            const registerE=new Register({
                yourName:req.body.Name,
                email:req.body.Email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })

            //password hashing

            const registered=await registerE.save();
            res.status(201).render("index");

        }
        else
        {
            res.send("Password are not Matching");
        }
    } catch (error) {
        res.status(404).send(`Invalid Credentials`);
    }
})
app.get("/about",(req,res)=>{
    res.render("about");
})


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

// const bcrypt=require("bcryptjs");

// const securepassword=async(password)=>{
//     const passwordHash=await bcrypt.hash(password,10);
//     console.log(passwordHash);
// }