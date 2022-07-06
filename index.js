const express = require('express')
// const http = require('http')
const cors = require('cors')
const mongoose = require("mongoose")

const dotenv = require('dotenv');
const userModel = require("./schema/user.model");
const app = express()
// const jwt = require('jsonwebtoken')
dotenv.config();
const dbUrl = "mongodb+srv://logeshwaran:goodmorning@blogmania.y6bz4.mongodb.net/?retryWrites=true&w=majority"
// routes
const login = require("./routers/login")
const user = require("./routers/user")
const posts = require("./routers/posts");
const verifyToken = require('./middleware/tokn');

const PORT = process.env.PORT || 3001

// middleware
app.use(cors());
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
app.get("/hello",(req,res)=>res.send("Hello"))

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log("connected Successfully");
    //console.log(res);
    app.listen(PORT)
}).catch(err=>console.log(err));




