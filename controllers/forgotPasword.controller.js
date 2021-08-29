
const User = require ('../models/User.model');
const Token = require('../models/forgotPassword.model');
const crypto = require ('crypto');
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose');
const nodemailer = require ('nodemailer');
const { error } = require('console');


const GetAllToken=(req,res,next)=>{

    Token.find()
    .then(token=>res.json(token))
    .catch(error=>res.json(error.message))
}


const ResetPassword = async (req, res, next)=>{
    if (!req.body.email)
    {
        return res
        .status (500)
        .json({message: "Email is required"});
    }
    const user = await User.findOne ({
        email: req.body.email
    });
    console.log('user',user);
        if(!user)
        {
            return res
            .status (500)
            .json({message:"Email does not exist"});
        }
var token = new Token ({userId: user.id, resettoken: crypto.randomBytes(3).toString('hex')})
    token.save (function(err){
        if (err)
        {
            console.log(err.message)
            return res
            .status (500)
            .send({msg: err.message});
        } 
        Token.find({_userId: user.id, resettoken:{$ne: token.resettoken}})
        .remove().exec();
        res
        .status(200)
        .json({message: "Reset Password succesfuly !"});
        var Transporter = nodemailer.createTransport
        ({
            service: 'gmail',
            auth: {
                user: 'vendle001@gmail.com',
                pass: 'jetaimevendle'
            }
        });
        var mailOption = 
        {
            to: user.email,
            from: 'vendle001@gmail.com',
            subject: 'Vendle Reset Password',
            text: `Code de reinitialisation de mot de passe : ${token.resettoken}`          
        }
            Transporter.sendMail (mailOption, function(err, data)
            {
                if(err)
                {
                    console.log('Error Occurs');
                }else {
                    console.log('Email sent successfully');
                }
            })
    })
}
const ValidPasswordtoken = async (req, res)=>{
            if(!req.body.resettoken){
                return res
                .status(500)
                .json({message:"token is required"});
            }
            const user = await Token.findOne({
               resettoken: req.body.resettoken 
              
            });
            
            if(!user){
                return res
                .status (409)
                .json ({message: 'Code invalide'});
            }
            User.findOneAndUpdate({id: user.userId})
                .then(()=>{
                    res
                .status(200)
                .json({message:'Token verified succesfully.'});
                })
                .catch((err)=>{
                    return res
                    .status(500)
                    .send({msg:err.message});
                   
                });
}

const NewPassword =async (req, res)=>{
    Token.findOne({resettoken: req.body.resettoken}, function (err,userToken, next){
            if(!userToken){
                return res
                .status(409)
                .json({message: 'Token has expired'});
            }
        User.findOne({
            _id: userToken.userId
        }, function (err, user, next){
            if(!user){
                return res
                .status(409)
                .json({message: 'User does not exist'});
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: 'Error hashing password' });
            }
            user.password = hash;
                  user.save(function (err) {
                    if (err) {
                      return res
                        .status(400)
                        .json({ message: 'Password can not reset.' });
                    } else {
                      userToken.remove();
                      return res
                        .status(201)
                        .json({ message: 'Password reset successfully' });
            }
        });
                
    });
});
    })
}
module.exports={
        ResetPassword:ResetPassword,
        ValidPasswordtoken:ValidPasswordtoken,
        NewPassword:NewPassword,
        GetAllToken:GetAllToken,
        
}
