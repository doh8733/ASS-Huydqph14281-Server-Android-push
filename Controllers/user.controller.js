const  UserModel = require('../models/user.model')
const {getAllUser} = require("../models/user.model");
const BookModel = require("../models/book.model");
const  bcrypt = require('bcrypt')
exports.getAllUser = async (req,res,next) =>{
    var listUsers = await UserModel.find()
    res.render('./user/list',{listUsers : listUsers})
}

exports.getFormAddUser =  (req,res,next) =>{
    res.render('./user/add')
}
exports.postAdduser = async(req,res,next)=>{
    console.log(req.body)

    if (req.body.pass != req.body.user_re_pass){
        return res.render('./user/add')
    }


    const  stringRandom = await  bcrypt.genSalt(10)
    var passwordA = await  bcrypt.hash(req.body.pass,stringRandom)
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt)
    const objUser = new UserModel(
        {
            name: req.body.name,
            email: req.body.email,
            pass: await  bcrypt.hash(req.body.pass,passwordA)
            // pass: await bcrypt.hash(req.body.user_pass)
        }
    );

   await UserModel.create(objUser,function (err){
       if (err){
           console.log(err)
           return res.render('./user/add',{msg:'loi dang ky'})
       }
       else console.log('ghi vao csdl thanh cong')
   })

    res.redirect('/Users/login')

}
exports.getFormEditUser =  async (req,res,next)=>{
    console.log(req.params)

    let  itemUser = await  UserModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
        console.log(err)

    })
    if (itemUser == null){
        res.send('khon tim thay ban ghi')
    }
    res.render('./user/edit',{itemUser : itemUser})
}
exports.postEditUser = async (req,res,next)=>{
    console.log(req.body)
    const  stringRandom = await  bcrypt.genSalt(10)
    var passwordA = await  bcrypt.hash(req.body.pass,stringRandom)
    if (req.body.pass !== req.body.pass){
        return res.render('./user/edit',{
            msg:'mat khau khong chung khop',
            body:req.body
        })

    }
    let dieu_kien = {
        _id : req.params.id
    }
    let du_lieu = {
        name : req.body.name,
        email : req.body.email,
        pass: await  bcrypt.hash(req.body.pass,passwordA),
        re_pass : req.body.user_re_pass_edit,
    }
    // if (req.body.user_re_pass_edit != req.body.pass){
    //     return res.send('mat khau khong trung nhau')
    // }

        UserModel.updateOne(dieu_kien,du_lieu,function (err,res) {
            if (err){
                res.send('loi')
            }
        })
        res.redirect('/Users')



}
// exports.getFormDeleteUser = async  (req,res,next) =>{
//     console.log(req.params)
//
//     let  itemUser = await UserModel.findById(req.params.id)
//         .exec()
//         .catch(function (err){
//         console.log(err)
//     })
//     if (itemUser ==null){
//         res.send('k co ban ghi')
//     }
//
// }
exports.postDeleteUser = (req,res,next)=>{
    let dieu_kien = {
        _id:req.body.DpInputID
    }
    UserModel.deleteOne(dieu_kien,function (err) {
        if (err){
            console.log(err)
        }else {
            console.log('thanh cong')
        }

    })
    res.redirect('/users');
    res.writeHead(301, {
        Location: "http://" + req.headers["host"] + "/users/"
    });
}
exports.getFormLogin = (req,res,next)=>{
    res.render('./user/login')
}
exports.postLogin = async (req,res,next)=>{
    const body = req.body;
    const  user = await  UserModel.findOne({
        email : req.body.email
    })
    if (user){
        // const  salt = await  bcrypt.genSalt(12);
        // let  passwordHash = await  bcrypt.hash(body.password_login,salt)
        //
        // let checkCompare = await bcrypt.compare(user.password+"",passwordHash+"", (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(result+" - "+body.password+" - "+user.password);
        //     // console.log(typeof result);
        //
        //     if (!result) {
        //         // console.log("false"+ req.session);
        //         return res.render('./user/login', {
        //             msg: 'Wrong password',
        //             body: body
        //         });
        //     }else {
        //         req.session.user = user;
        //         // console.log("true"+req.session);
        //         return res.redirect('/users');
        //     }
        // });

        const  validPassword = await  bcrypt.compare(req.body.pass,user.pass);
        if (validPassword){
            req.session.user = user
            res.redirect('/users')
        }else {
            res.status(400).json({error:'sai pass'})
        }
    }else {
     res.status(401).json({error:'khong ton tai user'})
    }
}
exports.listUser = (req,res,next)=>{

    res.render('./user',{currentUser:req.session.user})
}
exports.getLogout = (req, res) => {
    req.session.destroy(function(){
        console.log("Đăng xuất thành công")
    });
    return res.redirect('/users/login');
};