const {Schema,model} = require('mongoose')


const POST =  new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
        unique: true
    },
    created_at:{
        type:Date,
        default:Date()
    },
    published:{
        type:Boolean,
        default:true,
    },
    created_by:{
      type:String,
      requires:true
    }
})

const createPost = function(userId, post,userSchema) {
    console.log("\n>> Add Image:\n");
    return userSchema.findByIdAndUpdate(
      userId,
      {
        $push: {
          posts: {
            title: post.title,
            content: post.content
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  };

module.exports ={POSTMODEL:model("Posts",POST),POST,createPost}
