const BookModel = require('../models/book.model')
const mongoose = require("mongoose");
const bookModel = require('../models/book.model')
const  User = require('../models/user.model')
const bcrypt = require("bcrypt");
const {log} = require("debug");
exports.getListAPI = async (req, res, next) => {
    const listBook = await bookModel.find({});
    res.send(listBook)
}
exports.getOneAPI = async (req, res, next) => {
    const books = await bookModel.findById(req.params.id);
    res.send(books)
}
exports.postReq = async (req,res,next) =>{
    try{
        const  salt = bcrypt.genSaltSync(10);
        const user = new User(req.body);
        user.pass = await  bcrypt.hashSync(req.body.pass,salt);
        await  user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    }catch (error){
        console.log(error);
        res.status(400).send(error)
    }
}
exports.postLogin = async (req,res,next) =>{
    try{
        const user = await  User.findByCredentials(req.body.email,req.body.pass);
        console.log(req.body);
        if (!user){
            return res.status(401).send({
                message:'Login failed'
            });

        }

        const token = await user.generateAuthToken();
        res.status(200).send({
            user,token,message:'Login success'
        })
    }catch (error){
        res.status(400).send(error)
    }
}
exports.getProfile = (req,res,next) =>{
    res.send(req.user)
}
exports.postLogout = async (req,res,next)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await  req.user.save()
        res.send('Dang xuat thanh cong')
    }
    catch (error){
        console.log(error)
        res.status(500).send(error)
    }
}
exports.postLogoutAll = async (req,res,next) =>{
    try{
        req.user.tokens.splice(0,req.user.tokens.length)
        await  req.user.save()
        res.send('log-in all thanh cong')
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}