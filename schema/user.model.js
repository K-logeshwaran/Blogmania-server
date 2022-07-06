const {Schema,model} = require('mongoose')

const {POST} = require("./posts")

const USER =  new Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    DOJ:{
        type:Date,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"No Updated yet"
    },
    posts:[POST]
})

module.exports = model("USER",USER)