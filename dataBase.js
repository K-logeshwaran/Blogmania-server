const userSchema = require('./schema/user.model')

async function AddUsers(data){
    try{
        const user= new userSchema({
            password:data.password,
            email:data.email,
            DOJ:data.DOJ,
            userName:data.userName
        })
        user.save();
        return 'Data added Successfully'
    }catch(e){
        console.log(e.message);
        return `ERROR!: ${e.message}`
    }
}

module.exports = AddUsers;

