const express = require('express')
// const http = require('http')
const cors = require('cors')
const mongoose = require("mongoose")

const dotenv = require('dotenv');
const userModel = require("./schema/user.model");
const app = express()
app.use(cors());
// const jwt = require('jsonwebtoken')
dotenv.config();
const dbUrl = "mongodb+srv://logeshwaran:goodmorning@blogmania.y6bz4.mongodb.net/?retryWrites=true&w=majority"
//const dbUrl = "mongodb+srv://Logeshwaran-K:goodmorning@cluster0.bgckn.mongodb.net/?retryWrites=true&w=majority"
// routes
const login = require("./routers/login")
const user = require("./routers/user")
const posts = require("./routers/posts");
const verifyToken = require('./middleware/tokn');

const PORT = process.env.PORT || 3001

// middleware

app.use(express.json());    
app.use('/login',login)
app.use('/user',user)
app.use('/posts',posts)


app.get("/",verifyToken,async (req,res)=>{
    let allUsers = await  userModel.find({})
    let posts = []
    for (i of allUsers){
        posts.push(i.posts)
    }
    res.json(posts) 
});

app.get("/all/users",async (req,res)=>{
    console.log(req)
    let allUsers = await  userModel.find({})
    res.json(allUsers)
})

app.get("/hello",(req,res)=>res.send("Hello"))


app.post('/one',verifyToken,async (req,res)=>{
    let requestUsr = req.body.name 
    let user = await userModel.findOne({userName:requestUsr});
    if(!user) return res.send("Nouser found")
    let reply = {
        userName:user.userName,
        bio:user.bio,
        posts:user.posts,
        email:user.email,
    }
    console.log(user)
    console.log(req.body)
    return res.json(reply);
});



mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log(res)
    console.log("connected Successfully");
    //console.log(res);
    console.log("Listening on port ",PORT);
    app.listen(PORT)
}).catch(err=>console.log(err));




