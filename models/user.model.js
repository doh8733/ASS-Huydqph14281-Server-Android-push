const  mongoose = require('mongoose')
mongoose.connect('mongodb+srv://doh8733:huy123456@cluster0.do5qh.mongodb.net/book')

const  jwt = require('jsonwebtoken')
require('dotenv').config();
const  chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        name: 'String',
        pass: 'String',
        email: 'String',
        tokens:[{
             token:{
                type:String,
                require: true
            }
         }
        ]
    }
)
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log(user);
    const  token = jwt.sign({_id:user._id},chuoi_ky_tu_bi_mat);
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (Email,passwd)=>{
    const user = await Users.findOne({
        email : Email
    });
    console.log(user)
    if (!user){
        throw new Error({error:'Unable to login'})
    }
    const  isMatch = await bcrypt.compare(passwd,user.pass)
    console.log(isMatch)
    if (!isMatch){
        throw new Error({error:'Unable to login'})
    }
    return user;
}
const Users = mongoose.model('user', userSchema);
module.exports= Users
