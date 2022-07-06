const express = require("express")
const userModel = require("../schema/user.model");
const router = express.Router()
const verifyToken = require('../middleware/tokn')


router.post('/',verifyToken,(req,res)=>{
    console.log(req.user);
    userModel.findById(req.user.id,(err,user)=>{
        if(err) res.status(500).send("Internal Server Error")
        console.log("user");
        console.log(user);
        res.status(200).json({
            userName:user.userName,
            email:user.email,
            DOJ:user.DOJ,
            bio:user.bio,
            posts:user.posts 
        })
    })
});

router.put("/bio",verifyToken,(req,res)=>{
    console.log("put req");
    console.log(req.user)
    userModel.findByIdAndUpdate(req.user.id,{bio:req.body.bio},(err,docs)=>{
        if(err){
            res.status(500).send("Internal Server Error")
        }else{
            console.log(docs);
            res.status(204).send("Updated Successfully")
        }
    })
});

module.exports = router;