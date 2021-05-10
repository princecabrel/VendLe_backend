const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User.model.js');
require('dotenv').config();


module.exports.Login=(req,res,next)=>{
	const {email,password}=req.body;

	User.findOne({email})
	.then(user=>{
		try{
			if(!user)
					return res.status(404).json({message:'user not found'});
				let verify=bcrypt.compareSync(password,user.password);
				console.log("verify",verify)
				if(verify==false)
					res.status(500).json({message:"authentication failed incorrect password"})
				let token=jwt.sign({user:user},process.env.JWT_KEY);
				res.status(200).json({message:`${user.username} authenticated successfully` ,auth:true,token:token,user:user});
		}catch(error){
			console.log(error.message)
		}
	})
	.catch(error=>{
		res.status(500).json(error.message);
	})
}