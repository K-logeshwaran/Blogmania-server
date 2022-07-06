const express = require("express")
const crypto=require('crypto');
const AddUsers = require("../dataBase");
const userModel = require("../schema/user.model");
const router = express.Router()
const jwt = require('jsonwebtoken');

const HashPass=(email,password)=>crypto.createHmac('sha256',email).update(password).digest('base64')
const secretKey =  "jnsdfsdmkfmksldfmdsklvmskvmsfvjisofj90ir2984587634785345y34h3rh2ufufi90if3fFMHYFTDHRDOFIYTE46DTRRESFSZDJFGVHJKNMBHDNFJG"

router.get('/',(req,res)=>res.send("<h1>Hello user</h1>"))

router.post("/",(req,res)=>{
    console.log(req.body);
    let data = {...req.body}
    if(!data.email || !data.password || !data.DOJ){
       return res.status(404).send("All fields Are required")
    }
    try{
        data.password = HashPass(data.email,data.password)
    console.log(data);
    AddUsers(data).then(response=>{
        console.log(response)
        if(response.includes("duplicate key error")=== true){
            res.status(409).json({  
                message: "Email id already exists",
                email:data.email
            })
        }else{
            res.status(200).json({
                "msg":"Successfully Added",
                "data":{email:req.body.email,doj:req.body.DOJ}
            })
        }
        
    })
    .catch(err=>{
        console.log(err)
        res.send("Something went wrong").status(500);
    });
    }catch(err){
        console.log(err)
    }
    
    
    
});

router.post("/generateToken",(req,res)=>{
    console.log(req.body);
    let data;
    
    userModel.findOne({email:req.body.email},(err,user)=>{
        console.log(user)
        if(err) return  res.status(500).send("Internal Server Error")
        console.log(user);
        if(!user) return res.status(404).send("No User Found")
        if(HashPass(req.body.email,req.body.password)===user.password){
            data ={
                id:user._id,
                time: Date()
            }
            let token = jwt.sign(data,secretKey, {
                expiresIn: "1d",
              });
              
            res.send(token)
            console.log(data);
            console.log(token);
        }else{
            res.status(401).send("Wrong password")
        }
    });
    
});


module.exports = router;