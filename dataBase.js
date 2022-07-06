const userSchema = require('./schema/user.model')

async function AddUsers(data){
    try{
        const user= await new userSchema({
            password:data.password,
            email:data.email,
            DOJ:data.DOJ,
            userName:data.userName
        })
        await user.save();
        return 'Data added Successfully'
    }catch(e){
        console.log(e.message);
        return `ERROR!: ${e.message}`
    }
}

module.exports = AddUsers;

