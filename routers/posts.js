const express = require("express")
const userModel = require("../schema/user.model");
const router = express.Router()
const verifyToken = require('../middleware/tokn')
const USER = require('../schema/user.model')
const {POST,createPost} = require('../schema/posts')

router.post("/",verifyToken,async (req,res)=>{
   let User =await userModel.findById(req.user.id);
   let content = {...req.body.post}
   content.created_by =  User.userName
    let sts =  User.posts.push(content)
    console.log("sts................");
    console.log(sts);
    User.save()
    res.send("Success")
});


module.exports = router;