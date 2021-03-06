const mongoose = require('mongoose');
const Joi = require('joi-browser');
Joi.objectId = require('joi-objectid')(Joi)
const jwt = require("jsonwebtoken");
const config = require("config");


const userSchema =new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique :true
    },
    email :{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique :true
    },
    password :{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 1024,

    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken=function () {
   const token =  jwt.sign({_id:this.id,name:this.name, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
   return token;
}

const User =mongoose.model('User',userSchema);

function validateUser(user){
    const schema ={
        name :Joi.string().min(5).max(50).required(),
        email :Joi.string().min(5).max(255).required(),
        password :  Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user,schema);
}

exports.User =User;
exports.validateUser =validateUser;
