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

router.delete("/delete",verifyToken,async (req,res)=>{
    let user = await userModel.findById(req.user.id);
    let posts = user.posts
    let id = req.headers["postid"] || req.body.postid;
    console.log(id)
    for(let post of posts){
        console.log(post._id);
        if(id == post._id){
            let reqindex =posts.indexOf(post)
            posts.splice(reqindex);
            console.log("deleted")
        }
    }
    user.save()
    res.send("Deleted Successfully")
});

module.exports = router;